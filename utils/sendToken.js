import User from "../models/user.model.js";

const sendToken = async(res, user, message, statusCode = 200) => {
	const token = await user.generateJwtToken();
	const options = {
		expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure:true,
        sameSite:"none"
	};
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		message,
		user,
	});
};

export default sendToken;
