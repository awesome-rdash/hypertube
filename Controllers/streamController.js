const fs = require('fs');
const path = require('path');

exports.streamVideo = (req, res) => {
	const fpath = path.join(__dirname, '../Public/testFile.mp4');
	const stat = fs.statSync(fpath);
	const size = stat.size;
	const range = req.headers.range;

	if (range) {
		const parts = range.replace(/bytes=/, '').split('-');
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
		const chunksize = (end - start) + 1;
		const file = fs.createReadStream(fpath, { start, end });
		const head = {
			'Content-Range': `bytes ${start}-${end}/${size}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': size,
			'Content-Type': 'video/mp4',
		};
		res.writeHead(200, head);
		fs.createReadStream(fpath).pipe(res);
	}
};
