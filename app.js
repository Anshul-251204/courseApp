import express from "express";
import ErrorMiddleware from "./middlewares/error.middleware.js"
import cookieParser from "cookie-parser";
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";


app.use("/api/v1", courseRouter)
app.use("/api/v1/user", userRouter);

export default app;

app.use(ErrorMiddleware)

