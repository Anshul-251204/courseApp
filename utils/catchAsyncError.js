const catchAsyncError = (passedFunction) => (req,res,next) => {
	Promise.resolve(passedFunction(req, res, next)).catch((err) => next(err));
 // Promise.resolve(passedFunction(req,res,next)).catch(next)
}

export default catchAsyncError;