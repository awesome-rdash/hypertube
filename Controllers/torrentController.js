var Transmission = require('transmission');

var transmission = new Transmission({
	port: "9091",			// DEFAULT : 9091
	host: "127.0.0.1",			// DEFAULT : 127.0.0.1
	username: '',	// DEFAULT : BLANK
	password: ''	// DEFAULT : BLANK
});

function getTransmissionStats(){
	transmission.sessionStats(function(err, result){
		if(err){
			console.log(err);
		} else {
			console.log(result);
		}
	});
}

exports.startTorrentDl = (req, res) => {
	transmission.addUrl(req.body.magnet, function(err, arg){});
	getTransmissionStats();
};