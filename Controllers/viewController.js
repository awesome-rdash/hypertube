const mongoose = require('mongoose');

const View = mongoose.model('View');

exports.addView = async (req, res) => {
	const newView = await (new View({
		user: req.body.userId,
		movie: req.body.movieId,
		current: req.body.currentTime,
	}).save());
};

exports.getUserViews = async (req, res) => {
	const views = await View.find({ author: req.query.user }).populate('movie', ['title', 'slug']);
	return views;
};
