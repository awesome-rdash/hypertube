var Client = require('node-torrent');

exports.startTorrentDl = (req, res) => {
	console.log("Starting torrent download: " + req.body.magnet);
	var client = new Client({logLevel: 'TRACE'});
	var torrent = client.addTorrent(req.body.magnet);

	torrent.on('complete', function() {
	    console.log('complete!');
	    torrent.files.forEach(function(file) {
	        var newPath = 'new/path/' + file.path;
	        fs.rename(file.path, newPath);

	        // while still seeding need to make sure file.path points to the right place
	        file.path = newPath;
	    });
	});
};