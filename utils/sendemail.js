import { createTransport } from "nodemailer";

const sendEmail = async (to, subject, text) => {
	const transportor = createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "6fb362d15a0301",
			pass: "38232bd532fe98",
		},
	});

	await transportor.sendMail({
		to,
		subject,
		text,
		from: "annshulch2@gmail.com",
	});
};

export default sendEmail;
