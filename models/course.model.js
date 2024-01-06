import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, " please enter Title"],
	},
	description: {
		type: String,
		required: [true, " please enter description"],
	},
	lectures: [
		{
			title: {
				type: String,
				required: [true, " please enter Title"],
			},
			description: {
				type: String,
				required: [true, " please enter description"],
			},
			video: {
				public_id: String,
				url: String,
			},
		},
	],

	poster: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	views: {
		type: Number,
		default: 0,
	},
	numOfVideo: {
		type: Number,
		default: 0,
	},
	category: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});


const Course = mongoose.model("Course", courseSchema);
export default Course;
