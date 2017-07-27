const express = require('express');
const authController = require('./Controllers/authController');
const userController = require('./Controllers/userController');
const fetchController = require('./Controllers/fetchController');
const torrentController = require('./Controllers/torrentController');
const movieController = require('./Controllers/movieController');
const { catchErrors } = require('./Handlers/errorHandlers');

const router = express.Router();

router.get('/', async (req, res) => {
	let movies = null;
	if (req.user) {
		movies = await movieController.getMoviesByCategory();
		// console.log(movies);
	}
	// res.json(movies);
	res.render('home', { title: 'Home', user: req.user, movies });
});

router.get('/torrent', (req, res) => {
	res.render('torrent', { title: 'Torrents' });
});

router.post('/torrent', torrentController.startTorrentDl);

// Local Auth and Registration
router.post('/register/local',
	userController.validateRegister,
	userController.registerUser,
	authController.loginNoRedirect);
router.post('/login/local', authController.loginNoRedirect);

// Google Auth and Registration
router.get('/login/google', authController.loginGoogle);
router.get('/login/google/cb', authController.loginGoogleCb);

// 42 Auth and Registration
router.get('/login/42', authController.login42);
router.get('/login/42/cb', authController.login42Cb);
router.get('/logout', authController.logout);

// Password Reset
router.get('/forgot', userController.forgotPass);
router.get('/resetpass/:token', userController.resetPage);
router.post('/resetpass/:token', userController.changePassword);

router.get('/login/hasAccount', catchErrors(authController.hasAccount));

router.post('/update/user',
	userController.validateUpdate,
	userController.updateUser);

// Fetchers
router.get('/fetch/archive', catchErrors(fetchController.fetchArchive));
router.get('/fetch/yts', catchErrors(fetchController.fetchYts));
router.get('/fetch/subs', catchErrors(fetchController.fetchSubs));

// REST Api
router.get('/movies/home', catchErrors(movieController.sendMoviesByCategory));

// Export Routes
module.exports = router;
