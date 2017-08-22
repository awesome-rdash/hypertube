const mongoose = require('mongoose');
const ffmpeg = require('fluent-ffmpeg');
const mime = require('mime');
const fs = require('fs');
const path = require('path');

const Movie = mongoose.model('Movie');

exports.getVideoPath = async (req, res, next) => {
	const mov = await Movie.findOne({ _id: req.query.id });
	if (!mov || !mov.file.path) {
		return res.send('No Movie or no Path yet');
	}
	req.fpath = mov.file.path;
	return next();
};

exports.streamVideo = (req, res) => {
	const full = path.join(process.env.DOWNLOAD_DIR, req.fpath);
	const part = path.join(process.env.DOWNLOAD_DIR, `${req.fpath}.part`);
	let fpath;
	if (fs.existsSync(full)) {
		fpath = full;
	} else {
		fpath = part;
	}
	console.log('Comes in with path: ', fpath);
	const size = fs.statSync(fpath).size;
	const range = req.headers.range;

	// if (range) {
	// 	// console.log(range);
	// 	const parts = range.replace(/bytes=/, '').split('-');
	// 	const start = parseInt(parts[0], 10);
	// 	const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
	// 	const chunksize = (end - start) + 1;
	// 	const head = {
	// 		'Content-Range': `bytes ${start}-${end}/${size}`,
	// 		'Accept-Ranges': 'bytes',
	// 		'Content-Length': chunksize,
	// 		'Content-Type': 'video/webm',
	// 	};
	// 	const file = fs.createReadStream(fpath, { start, end });
	// 	res.writeHead(206, head);
	// 	if (mime.lookup(fpath) !== 'video/webm') {
	// 		console.log('Not WEBM');
	// 		ffmpeg(file)
	// 			.videoCodec('libvpx')
	// 		  .videoBitrate(1024)
	// 		  .audioCodec('libvorbis')
	// 			.format('webm')
	// 			.on('error', (err, stdout, strerr) => {	console.log('ERROR: ', err); })
	// 			.on('stderr', (stdline) => { console.log('STDERR 2: ', stdline); })
	// 			.pipe(res);
	// 	} else {
	// 		file.pipe(res);
	// 	}
	// } else {
	const head = {
		// 'Content-Length': size,
		'Content-Type': 'video/webm',
	};
	res.writeHead(200, head);
	if (mime.lookup(fpath) !== 'video/webm') {
		console.log('Not WEBM');
		ffmpeg(fpath)
			.videoCodec('libvpx')
		  .videoBitrate(1024)
		  .audioCodec('libvorbis')
			.format('webm')
			.addOptions('-preset ultrafast')
			.on('error', (err, stdout, strerr) => {	console.log('ERROR: ', err); })
			.on('stderr', (stdline) => { console.log('STDERR 1: ', stdline); })
			.pipe(res);
	} else {
		fs.createReadStream(fpath).pipe(res);
	}
// }
};
