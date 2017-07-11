// Entry Point !
// Check for node version (7.6+ required)
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor < 6)) {
  console.log('Node.js version is too old. Please use 7.6 or above');
  process.exit();
}

// Load *variables.env* into proccess.env
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Import Models

require('./Models/User');

<<<<<<< HEAD
// Launch Server
const app = require('./app');
app.set('port', process.env.PORT || 7777);
=======
app.set('port', process.env.PORT || 8888);
>>>>>>> a482edd6fd74dc725c6c99d5f0b02a197342b116
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
