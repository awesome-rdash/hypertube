const express = require('express');
const router = express.Router();

const authController = require('./Controllers/authController');
const { catchErrors } = require('./Handlers/errorHandlers');

router.get('/', (req, res) => {
	res.render('home', { title: "Home" });
});

router.post('/login/local', authController.loginLocal);
router.get('/login/google', authController.loginGoogle);
router.get('/login/google/cb', authController.loginGoogleCb, (req, res) => { res.redirect('/'); });

// Export Routes
module.exports = router;
