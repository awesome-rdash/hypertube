const express = require('express');
const router = express.Router();

const authController = require('./Controllers/authController');
const { catchErrors } = require('./Handlers/errorHandlers');

router.get('/', (req, res) => {
	var user = req.user || null;
	res.render('home', { title: "Home", user });
});

router.post('/login/local', authController.loginLocal);
router.get('/login/google', authController.loginGoogle);
router.get('/login/google/cb', authController.loginGoogleCb);

router.get('/logout', authController.logout);

// Export Routes
module.exports = router;
