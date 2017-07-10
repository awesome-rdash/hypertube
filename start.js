// Entry Point !
// Check for node version (7.6+ required)
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor < 6)) {
  console.log('Node.js version is too old. Please use 7.6 or above');
  process.exit();
}

// Require Modules
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

// Require Needed Files
const helpers = require('./Handlers/helpers');
const errorHandlers = require('./Handlers/errorHandlers');
const routes = require('./index.js');

const app = express();

// Load *variables.env* into proccess.env

require('dotenv').config({ path: 'variables.env' });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passing variables to templates + all requests
app.use((req, res, next) => {
	res.locals.h = helpers;
	// res.locals.user = req.session.user || null;
	next();
});

// Routes !
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// app.use(errorHandlers.productionErrors);

app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
