const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.validateData = (req, res, next) => {
	req.checkBody('nom', 'You must supply a Last Name!').notEmpty();
	req.checkBody('prenom', 'You must supply a First Name!').notEmpty();
	req.sanitizeBody('nom');
	req.sanitizeBody('prenom');
	req.checkBody('email', 'That Email is not valid!').isEmail();
	req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
// req.checkBody('password', 'Password Cannot be Blank!').matches(((?=.*\d)(?=.*[a-z]).{6, 20}));
	req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
	req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		console.log(errors);
		return res.json({
			errors,
			body: req.body,
		});
	}
	next();
};

exports.registerUser = (req, res, next) => {
	User.register(new User({
		email: req.body.email,
		username: `${req.body.firstName} ${req.body.lastName[0]}`,
		'auth.type': 'local',
	}), req.body.password, (err) => {
		if (err) {
			return res.send(err);
<<<<<<< HEAD
		console.log("nimporte quoi");
=======
		}
>>>>>>> auth-stategies
		next();
	});
};

// email
// mdp
// conf mdp
// nom
// prenom
// photo
