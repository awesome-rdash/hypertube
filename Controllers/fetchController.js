const mongoose = require('mongoose');
const request = require('request');

const doRequest = url => new Promise((resolve, reject) => {
	request(url, (error, res, body) => {
		if (!error && res.statusCode === 200) {
			resolve(body);
		} else {
			reject(error);
		}
	});
});

exports.fetchArchive = async (req, res) => {
	const data = await doRequest('https://archive.org/advancedsearch.php?q=mediatype%3Amovies+collection%3AComedy_Films&fl%5B%5D=date&fl%5B%5D=downloads&fl%5B%5D=mediatype&fl%5B%5D=title&sort%5B%5D=downloads+desc&sort%5B%5D=&sort%5B%5D=&rows=100&page=1&output=json&callback=callback&save=yes#raw');
	res.send(data);
};
