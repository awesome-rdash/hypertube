const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

exports.writeCom = async (req, res) => {
	req.checkBody('com', 'errCom').notEmpty();
	req.body.com = req.body.com.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	const results = await req.getValidationResult();
	if (!results.isEmpty()) {
		return res.json({ errors: results.array()[0] });
	}
	const com = new Comment({
		com: req.body.com,
		author: req.user._id,
		movie: req.body.movieId,
	});
	await com.save();
	if (com) {
		return res.send({ param: 'success', com });
	}
	return res.send(false);
};

exports.getComs = async (req, res) => {
	const coms = await Comment.find({ movie: req.params.id });
	if (coms) {
		return res.json(coms);
	}
	return res.send(null);
};
