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
	const movies = Movie.aggregate([
		{ $match: {} },
		{ $sort: { year: -1 } },
		{ $limit: 24 },
	]);
	res.json(movies);
};
