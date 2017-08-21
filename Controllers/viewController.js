const mongoose = require('mongoose');

const View = mongoose.model('View');

exports.addView = async (req, res) => {
	const newView = await View.findOneAndUpdate({
		movie: req.body.movieId,
		user: req.user.id,
	}, {
		current: req.body.currentTime,
	},
	{ upsert: true, new: true });
	res.json(newView);
};

exports.getUserViews = async (req, res) => {
	const views = await View.find({ author: req.query.user }).populate('movie', ['title', 'slug']);
	res.json(views);
};
