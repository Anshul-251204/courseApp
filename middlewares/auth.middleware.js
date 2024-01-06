import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";
export const auth = catchAsyncError(async(req,res,next)=>{

    const {token} = req.cookies;

    if(!token) return next(new ErrorHandler("Not logged in user",400))

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();

})