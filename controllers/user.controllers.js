import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/user.model.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendemail.js";
import Course from "./course.controllers.js"
export const login = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new ErrorHandler("All Fields are required ", 400));

	const user = await User.findOne({ email }).select("+password");

	if (!user)
		return next(new ErrorHandler("User doenst Exits with this email", 409));

	const isMatch = await user.checkPassword(password);

	if (!isMatch)
		return next(new ErrorHandler("email or password incorrect", 400));

	sendToken(res, user, `welcome back , ${user.name}`, 201);
});

export const register = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password)
		return next(new ErrorHandler("All Fields are required ", 400));

	let user = await User.findOne({ email });

	if (user)
		return next(
			new ErrorHandler("User Already Exits with this email", 409)
		);

	user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "temp",
			url: "temp",
		},
	});

	sendToken(res, user, "Register successsfully", 201);
});

export const logout = catchAsyncError(async (req, res, next) => {
	res.status(200)
		.cookie("token", null, {
			expires: new Date(Date.now()),
		})
		.json({
			success: true,
			message: "loged out successfully",
		});
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	res.status(200).json({
		success: true,
		user,
	});
});

export const changePassword = catchAsyncError(async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;

	if (!oldPassword || !newPassword)
		return next(new ErrorHandler("All Fields are required ", 400));

	const user = await User.findById(req.user._id).select("+password");

	const isMatch = await user.checkPassword(oldPassword);

	if (!isMatch) return next(new ErrorHandler("password is incorrect", 400));

	user.password = newPassword;
	await user.save();

	res.status(200).json({
		success: true,
		message: "Password change successfully",
		user,
	});
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
	const { name, email } = req.body;

	const user = await User.findById(req.user._id);

	if (!name || !email)
		return next(new ErrorHandler("All Fields are required ", 400));

	user.name = name;
	user.email = email;

	await user.save();

	res.status(200).json({
		success: true,
		message: "Profile Update successfully",
		user,
	});
});

//not complete
export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
	res.status(200).json({
		success: true,
		message: "Profile picture changes",
	});
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
	const { email } = req.body;

	const user = await User.findOne({ email });

	if (!user) return next(new ErrorHandler("Invaild email !", 400));

	const resetToken = await user.getResetToken();

	//http://localhost:5167/resetpassword/vnohgoird4r8fiodjvif48tgrfjkvjf
	const url = `${process.env.FRONTEND_URL}/resettoken/${resetToken}`;

	const message =
		"click on the link to reset your password, " +
		url +
		"if you have not requrest then please ignore";
	await sendEmail(user.email, "CourseApp Reset Password");

	res.status(200).json({
		success: true,
		message: `Reset Token has sent to you'r email ${user.email}`,
	});
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const token = req.param;

    
});


export const addToPlaylist = catchAsyncError(async(req,res,next)=> {

	const user  = await User.findById(req.user._id);

	const course = await Course.findById(req.body.id);

	if(!course) return next(new ErrorHandler("Invalid course id",404));

	user.playlist.push(
		{
			course: course.id,
			poster:course.poster.url
		}
	)
	await user.save();

	res.status(200),json({
		message:"add to play"
	})

})

export const removefromplaylist = catchAsyncError(async (req, res, next) => {});
