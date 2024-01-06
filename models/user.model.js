import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, " please enter you name"],
	},
	email: {
		type: String,
		required: [true, "Please enter you email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	subscription: {
		id: String,
		status: String,
	},
	avatar: {
		public_id: String,
		url: String,
	},
	playlist: [
		{
			course: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
			Poster: {
				public_id: String,
				url: String,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: String,
});

userSchema.methods.generateJwtToken = async function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	const en = await bcrypt.hash(this.password, 10);
	this.password = en;
	next();
});

userSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetToken = async function () {
	const resetToken = await crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = await crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.resetPasswordExpire = Date.now() + 15 + 60 * 1000;
	return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
