const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');
const Comment = mongoose.model('Comment');

exports.getTopMovies = async () => {
	const movies = [];
	const SciFi = await Movie.aggregate([
		{ $match: { genres: 'Sci-Fi' } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 1, slug: 1, rating: 1, year: 1, title: 1, image: 1 } },
	]);

	const Action = await Movie.aggregate([
		{ $match: { genres: 'Action' } },
		{ $match: { slug: { $nin: SciFi.map(movie => movie.slug) } } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 1, slug: 1, rating: 1, year: 1, title: 1, image: 1 } },
	]);

	const Comedy = await Movie.aggregate([
		{ $match: { genres: 'Comedy' } },
		{ $match: { slug: { $nin: SciFi.map(movie => movie.slug) } } },
		{ $match: { slug: { $nin: Action.map(movie => movie.slug) } } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 1, slug: 1, rating: 1, year: 1, title: 1, image: 1 } },
	]);
	const Drama = await Movie.aggregate([
		{ $match: { genres: 'Drama' } },
		{ $match: { slug: { $nin: SciFi.map(movie => movie.slug) } } },
		{ $match: { slug: { $nin: Action.map(movie => movie.slug) } } },
		{ $match: { slug: { $nin: Comedy.map(movie => movie.slug) } } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 1, slug: 1, rating: 1, year: 1, title: 1, image: 1 } },
	]);
	movies.push(SciFi, Action, Comedy, Drama);
	return movies;
};

exports.getMovieById = async (req, res) => {
	const proms = [];
	proms.push(Movie.findOne({ _id: req.params.id }));
	proms.push(
		Comment.find({ movie: req.params.id })
			.sort({ posted: -1 })
			.populate('author', ['username', 'photo']));
	const [movie, coms] = await Promise.all(proms);
	if (!movie) {
		return res.send('This movie doesn\'t exist');
	}
	const ret = {
		id: movie._id,
		title: movie.title,
		description: movie.description,
		year: movie.year,
		rating: movie.rating,
		length: movie.length,
		image: movie.image,
		coms,
	};
	console.log(ret);
	return res.json(ret);
};

exports.searchMovie = async (req, res) => {
	if (!req.query.string || !req.query.string.match(/^[a-z0-9]+$/i)) {
		return res.send(null);
	}
	const agg = [];
	const regex = new RegExp(`${req.query.string}`);
	if (req.query.string && req.query.string.length) {
		agg.push({ $match: { $or: [
			{ title: { $regex: regex, $options: 'i' } },
			{ genres: { $regex: regex, $options: 'i' } },
		] } });
	}
	if (req.query.genre && req.query.genre.length) {
		agg.push({ $match: { genres: req.query.genre } });
	}
	if (req.query.rating) {
		agg.push({ $match: { rating: { $gte: Number(req.query.rating) } } });
	}
	if (req.query.sort && req.query.sort.length) {
		const sort = {};
		if (req.query.sort === 'title' || req.query.sort === 'length') {
			sort[req.query.sort] = 1;
		} else if (req.query.sort === 'year' || req.query.sort === 'rating') {
			sort[req.query.sort] = -1;
		}
		agg.push({ $sort: sort });
	} else {
		agg.push({ $sort: { rating: -1 } });
	}
	agg.push({ $skip: 24 * Number(req.query.index) });
	agg.push({ $limit: 24 });
	agg.push({ $project: {
		_id: 1,
		slug: 1,
		title: 1,
		image: 1,
		genres: 1,
		rating: 1,
		year: 1,
		length: 1,
	} });
	const movies = await Movie.aggregate(agg);
	return res.json(movies);
};
