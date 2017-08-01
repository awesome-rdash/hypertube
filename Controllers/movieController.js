const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');

exports.getTopMovies = async () => {
	const movies = [];
	const SciFi = await Movie.aggregate([
		{ $match: { genres: 'Sci-Fi' } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);

	const Action = await Movie.aggregate([
		{ $match: { genres: 'Action' } },
		{ $match: { slug: { $nin: SciFi.map(movie => movie.slug) } } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);

	const Comedy = await Movie.aggregate([
		{ $match: { genres: 'Comedy' } },
		{ $match: { slug: { $nin: SciFi.map(movie => movie.slug) } } },
		{ $match: { slug: { $nin: Action.map(movie => movie.slug) } } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);
	const Drama = await Movie.aggregate([
		{ $match: { genres: 'Drama' } },
		{ $match: { slug: { $nin: SciFi.map(movie => movie.slug) } } },
		{ $match: { slug: { $nin: Action.map(movie => movie.slug) } } },
		{ $match: { slug: { $nin: Comedy.map(movie => movie.slug) } } },
		{ $sort: { rating: -1 } },
		{ $limit: 6 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);
	movies.push(SciFi, Action, Comedy, Drama);
	return movies;
};

exports.getMovieBySlug = async (req, res, next) => {
	const movie = await Movie.findOne({ slug: req.params.slug });
	if (!movie) {
		return res.send('This movie doesn\'t exist');
	}
	req.movie = movie;
	return next();
};

exports.searchMovie = async (req, res) => {
	const agg = [];
	if (req.query.string && req.query.string.length) {
		agg.push({ $match: { $text: { $search: req.query.string } } });
	}
	if (req.query.genre && req.query.genre.length) {
		agg.push({ $match: { genres: req.query.genre } });
	}
	if (req.query.rating) {
		agg.push({ $match: { rating: { $gte: Number(req.query.rating) } } });
	}
	agg.push({ $sort: { year: -1 } });
	agg.push({ $limit: 24 });
	agg.push({ $project: { _id: 0, slug: 1, title: 1, image: 1, genres: 1, rating: 1 } });
	console.log(agg);
	const movies = await Movie.aggregate(agg);
	res.json(movies);
};
