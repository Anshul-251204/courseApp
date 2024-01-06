import Course from "../models/course.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";

export const getAllCourses = async (req, res) => {
	const courses = await Course.find().select("-lectures");

	res.status(200).json({
		success: true,
		courses,
	});
};

export const createCourse = catchAsyncError(async (req, res, next) => {
	const { title, description, createdBy, category } = req.body;

	// const file = req.file

	if (!title || !description || !category || !createdBy)
		return next(new ErrorHandler("all fields are required ", 400));

	const courses = await Course.create({
		title,
		description,
		category,
		createdBy,
		poster: {
			public_id: "temp",
			url: "temp",
		},
	});

	res.status(200).json({
		success: true,
		message: "course Created successfully you Can add lectures now !",
		courses,
	});
});
