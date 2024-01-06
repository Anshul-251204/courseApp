import connectDb from "./db/dbConnect.js";
import { config } from "dotenv";
config({
	path: "./.env",
});
import app from "./app.js";

connectDb()
	.then(() => {
		app.listen(process.env.PORT, () =>
			console.log(
				"⚙️  server is starting RUNNING on PORT->",
				process.env.PORT
			)
		);
	})
	.catch((err) => {
		console.log("mongo Db CONNECTION FAILED !!", err);
	});

