const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');

exports.getMoviesByCategory = async () => {
	const SciFi = Movie.aggregate([
		{ $match: { genres: 'Sci-Fi' } },
		{ $sort: { rating: -1 } },
		{ $limit: 5 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);
	const Action = Movie.aggregate([
		{ $match: { genres: 'Action' } },
		{ $sort: { rating: -1 } },
		{ $limit: 5 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);
	const Comedy = Movie.aggregate([
		{ $match: { genres: 'Comedy' } },
		{ $sort: { rating: -1 } },
		{ $limit: 5 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);
	const Drama = Movie.aggregate([
		{ $match: { genres: 'Drama' } },
		{ $sort: { rating: -1 } },
		{ $limit: 5 },
		{ $project: { _id: 0, slug: 1, title: 1, image: 1 } },
	]);
	const movies = await Promise.all([SciFi, Action, Comedy, Drama]);
	// console.log(movies);
	return movies;
};

// Sci-Fi
// Action
// Comedy
// Drama
