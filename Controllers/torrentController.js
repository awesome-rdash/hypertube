const Transmission = require('transmission');
const Path = require('path');
const mongoose = require('mongoose');
const Util = require('util');

const Movie = mongoose.model('Movie');

const transmission = new Transmission({
	port: '9091',
	host: '127.0.0.1',
	username: '',
	password: '',
});

// Controlling global session

exports.getTransmissionStats = () => {
	transmission.sessionStats(callback = (err, result) => {
		if (err) {
			console.log(err);
		}
		return result;
	});
};

exports.getFreeSpace = (path) => {
	transmission.freeSpace(path, callback = (err, result) => {
		if (err) {
			console.log(err);
		}
		return result;
	});
};

// Controlling queue

exports.addTorrentUrlToQueue = (url) => {
	transmission.addUrl(url, {
		'download-dir': process.env.DOWNLOAD_DIR,
	}, (err, result) => {
		if (err) {
			return console.log(err);
		}
		id = result.id;
		console.log('Just added a new torrent.');
		console.log(`Torrent ID: ${id}`);
		return id;
	});
};

exports.addTorrent = async (req, res, next) => {
	const mov = await Movie.findOne({ _id: req.params.id });
	const magnet = mov.magnet;
	transmission.addUrl(magnet, {
		'download-dir': process.env.DOWNLOAD_DIR,
	}, (err, result) => {
		if (err) {
			console.log(err);
			res.send('error while adding torrent');
		}
		req.id = result.id;
		console.log(`Added Torrent. ID: ${req.id}`);
		return next();
	});
};

exports.getTorrentInfos = async (req, res, next) => {
	transmission.get(parseInt(req.id, 10), async (err, result) => {
		if (err) {
			res.send('Error while getting torrent infos');
		}
		if (result.torrents.length > 0) {
			let filePath = null;
			let mlen = 0;
			await result.torrents[0].files.forEach(async (file) => {
				if (file.length > mlen) {
					mlen = file.length;
					filePath = file.name;
				}
			});
			const mov = await Movie.findOneAndUpdate(
				{ _id: req.params.id },
				{ path: filePath },
				{ new: true });
		}
		return next();
	});
};

exports.addTorrentFileToQueue = (filePath) => {
	transmission.addFile(filePath, callback(err, result));
};

exports.removeTorrentFromQueue = (torrentId, withFile) => {
	transmission.remove(id, withFile, callback(err, result));
};

exports.startAllActiveTorrent = () => {
	transmission.active((err, result) => {
		if (err) {
			console.log(err);
		} else {
			for (i = 0; i < result.torrents.length; i + 1) {
				stopTorrents(result.torrents[i].id);
			}
		}
	});
};

exports.stopAllActiveTorrents = () => {
	transmission.active((err, result) => {
		if (err) {
			console.log(err);
		} else {
			for (i = 0; i < result.torrents.length; i + 1) {
				stopTorrents(result.torrents[i].id);
			}
		}
	});
};

// Controlling torrents

exports.getTorrentInformations = (torrentId) => {
	transmission.get(parseInt(torrentId, 10), callback = (err, result) => {
		if (err) {
			throw err;
		}
		if (result.torrents.length > 0) {
			console.log(result.torrents[0]);
			return result.torrents[0];
		}
		return false;
	});
};

exports.startTorrent = (torrentId) => {
	transmission.start(torrentId, (err, result) => {});
};

exports.stopTorrent = (torrentId) => {
	transmission.stop(torrentId, (err, result) => {});
};

exports.getAllActiveTorrents = () => {
	transmission.active(callback = (err, result) => {
		if (err) {
			console.log(err);
		} else {
			for (i = 0; i < result.torrents.length; i + 1) {
				console.log(result.torrents[i].id);
				console.log(result.torrents[i].name);
			}
		}
	});
};

exports.verifyTorrent = (torrentId) => {
	transmission.verify(torrentId, (err, arg) => {
		console.log(arg);
		return arg;
	});
};

exports.getFiles = (torrentId) => {
	transmission.files(torrentId, (err, arg) => {
		console.log(Util.inspect(arg, { showHidden: false, depth: null }));
		return arg;
	});
};

exports.renameTorrent = (torrentId, path, name) => {
	transmission.rename(torrentId, path, name, (err, arg) => {
		console.log(Util.inspect(arg, { showHidden: false, depth: null }));
		return arg;
	});
};
