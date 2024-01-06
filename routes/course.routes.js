import { Router } from "express";
import { createCourse, getAllCourses } from "../controllers/course.controllers.js";

const router = Router();

router.route("/courses").get(getAllCourses)

router.route("/createcourse").post(createCourse);

export default router;