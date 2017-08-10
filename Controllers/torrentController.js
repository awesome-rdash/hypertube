Transmission = require('transmission');
Util = require('util');

transmission = new Transmission({
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

exports.freeSpace = (path) => {
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

exports.addTorrentFileToQueue = (file) => {
	transmission.addUrl(file, callback(err, result));
};

exports.removeTorrentFromQueue = (torrentId) => {
	transmission.remove(id, callback(err, result));
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

exports.verify = (torrentId) => {
	transmission.verify(torrentId, (err, arg) => {
		console.log(arg);
		return arg;
	});
};

exports.files = (torrentId) => {
	transmission.files(torrentId, (err, arg) => {
		console.log(Util.inspect(arg, { showHidden: false, depth: null }));
		return arg;
	});
};

exports.rename = (torrentId, path, name) => {
	transmission.rename(torrentId, path, name, (err, arg) => {
		console.log(Util.inspect(arg, { showHidden: false, depth: null }));
		return arg;
	});
};
