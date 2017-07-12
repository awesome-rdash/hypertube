const express = require('express');
const router = express.Router();

const authController = require('./Controllers/authController');
const userController = require('./Controllers/userController');
const { catchErrors } = require('./Handlers/errorHandlers');

router.get('/', (req, res) => {
	var user = req.user || null;
	res.render('home', { title: "Home", user });
});

// Local Auth and Registration
router.post('/register/local',
	userController.validateData,
	userController.registerUser,
	authController.loginNoRedirect
);
router.post('/login/local', authController.loginLocal);

// Google Auth and Registration
router.get('/login/google', authController.loginGoogle);
router.get('/login/google/cb', authController.loginGoogleCb);

// 42 Auth and Registration
router.get('/login/42', authController.login42);
router.get('/login/42/cb', authController.login42Cb);
router.get('/logout', authController.logout);

router.get('login/hasAccount', authController.hasAccount);

// Export Routes
module.exports = router;
