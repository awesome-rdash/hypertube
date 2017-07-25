const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	secure: true,
	port: 465,
	auth: {
		user: 'hypertubeteam@gmail.com',
		pass: '',
	},
});

// TODO change to process and do view

transport.verify((err, succ) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Success mail!');
	}
});

const sendMail = mailOptions => new Promise((resolve, reject) => {
	transport.sendMail(mailOptions, (error, info) => {
		if (!error) {
			resolve(info);
		} else {
			reject(error);
		}
	});
});

exports.send = async (options) => {
	const mailOptions = {
		from: 'HyperTube Support <support@hypertube.com>',
		to: options.email,
		subject: options.subject,
		text: options.text,
	};
	return sendMail(mailOptions);
};
