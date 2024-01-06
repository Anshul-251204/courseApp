class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.success = false;
		this.message = message;
	}
}

export default ErrorHandler;