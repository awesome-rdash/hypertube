const fs = require('fs');
const path = require('path');

exports.streamVideo = (req, res) => {
	const fpath = path.join(__dirname, '../testFile.mp4');
	const stat = fs.statSync(fpath);
	const size = stat.size;
	const range = req.headers.range;
	console.log(range);
	res.json('ok');
};
