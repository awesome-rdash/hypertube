Transmission = require('transmission');

transmission = new Transmission({
	port: '9091',			// DEFAULT : 9091
	host: '127.0.0.1',			// DEFAULT : 127.0.0.1
	username: '',	// DEFAULT : BLANK
	password: '',	// DEFAULT : BLANK
});

function callback(err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
}

function getTransmissionStats() {
	transmission.sessionStats(callback(err, result));
}

exports.startTorrentDl = (req, res) => {
	transmission.addUrl(req.body.magnet, callback(err, result));
	getTransmissionStats();
};
