// Require Modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

// Require Needed Files
const helpers = require('./Handlers/helpers');
const routines = require('./Handlers/routines');
const fetchController = require('./Controllers/fetchController');
const errorHandlers = require('./Handlers/errorHandlers');
const routes = require('./index');
require('./handlers/passport');

const app = express();

setInterval(fetchController.fetchYts, 10000);
// setInterval(fetchController.fetchYts, 18000000);
setInterval(fetchController.fetchArchive, 10000);
// setInterval(fetchController.fetchArchive, 18000000);
setInterval(routines.cleanMovies, 86400000);

// View Engine
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

// Makes raw requests readable in req.body
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(expressValidator());

// Db sessions
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Passport Auth
app.use(passport.initialize());
app.use(passport.session());

// Passing variables to templates + all requests
app.use((req, res, next) => {
	res.locals.h = helpers;
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

module.exports = app;
