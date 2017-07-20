const mongoose = require('mongoose');
const request = require('request');
const magnet = require('magnet-uri');

const Movie = mongoose.model('Movie');

const doRequest = url => new Promise((resolve, reject) => {
	request(url, (error, res, body) => {
		if (!error && res.statusCode === 200) {
			resolve(body);
		} else {
			reject(error);
		}
	});
});

const getArchiveURI = elem => magnet.encode({
	xt: `urn:btih:${elem.btih}`,
	dn: encodeURI(elem.title),
	tr: [
		'http://bt1.archive.org:6969/announce',
		'http://bt2.archive.org:6969/announce',
	],
});


const getImdbId = (elem) => {
	let tag;
	if (elem.stripped_tags && Array.isArray(elem.stripped_tags)) {
		elem.stripped_tags.forEach((url) => {
			if (url.match('tt\\d{7}')) {
				tag = url.match('tt\\d{7}')[0];
			}
		});
	} else if (elem.stripped_tags && typeof elem.stripped_tags === 'string') {
		if (elem.stripped_tags.match('tt\\d{7}')) {
			tag = elem.stripped_tags.match('tt\\d{7}')[0];
		}
	} else if (elem.description && elem.description.match('tt\\d{7}')) {
		tag = elem.description.match('tt\\d{7}')[0];
	}
	return tag;
};

exports.fetchArchive = async (req, res) => {
	let data = await doRequest('https://archive.org/advancedsearch.php?q=mediatype%3Amovies+collection%3AComedy_Films&fl%5B%5D=btih&fl%5B%5D=description&fl%5B%5D=format&fl%5B%5D=language&fl%5B%5D=stripped_tags&fl%5B%5D=title&sort%5B%5D=avg_rating+desc&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&callback=callback&save=yes#raw');
	if (data) {
		const clean = [];
		data = JSON.parse(data.substr(9, data.length - 10));
		const movies = data.response.docs;
		movies.forEach((elem) => {
			const uri = getArchiveURI(elem);
			const imdbId = getImdbId(elem);

			clean.push({
				title: `${elem.title || elem.title[0]}`,
				magnet: uri,
				description: elem.description,
				imdbId,
			});
		});
		return res.json(clean);
	}
	return res.send('Error');
};

const getYtsURI = (movie) => {
	const hash = (movie.torrents && movie.torrents[0] && movie.torrents[0].hash) || undefined;
	const mag = magnet.encode({
		xt: `urn:btih:${hash}`,
		dn: encodeURI(movie.title),
		tr: [
			'udp://open.demonii.com:1337/announce',
			'udp://tracker.openbittorrent.com:80',
			'udp://tracker.coppersurfer.tk:6969',
			'udp://glotorrents.pw:6969/announce',
			'udp://tracker.opentrackr.org:1337/announce',
			'udp://torrent.gresille.org:80/announce',
			'udp://p4p.arenabg.com:1337',
			'udp://tracker.leechers-paradise.org:6969',
		],
	});
	return hash !== undefined ? mag : null;
};

const dataFetcher = (url, pageNb) => {
	const promises = [];
	for (let page = 1; page <= pageNb; page += 1) {
		promises.push(doRequest(`${url}&page=${page}`));
	}
	return promises;
};

exports.fetchYts = async (req, res) => {
	const url = 'https://yts.ag/api/v2/list_movies.json?limit=50';
	const firstPage = await doRequest(`${url}&page=1`);
	const pageNb = Math.ceil(JSON.parse(firstPage).data.movie_count / 50);
	const result = await Promise.all(dataFetcher(url, pageNb)); // Resolves all promises
	const clean = [];
	result.forEach((page) => {
		JSON.parse(page).data.movies.forEach((movie) => {
			clean.push({
				title: movie.title,
				slug: movie.slug,
				year: movie.year,
				rating: movie.rating,
				length: movie.runtime,
				description: movie.synopsis,
				image: movie.large_cover_image,
				magnet: {
					lowhd: getYtsURI(movie),
					fullhd: getYtsURI(movie),
				},
			});
		});
	});
	if (clean) {
		const bulk = Movie.collection.initializeUnorderedBulkOp();
		clean.forEach((movie) => {
			bulk.find({ slug: movie.slug }).upsert().updateOne({ $set: movie });
		});
		await bulk.execute();
		return res.json('ok');
	}
	return res.send('Error');
};
