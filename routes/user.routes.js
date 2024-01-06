import { Router } from "express";
import { addToPlaylist, changePassword, getMyProfile, login, logout, register, removefromplaylist, updateProfile, updateProfilePicture } from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/me").get(auth, getMyProfile);

router.route("/changepassword").put(auth, changePassword);

router.route("/updateprofile").put(auth, updateProfile);

router.route("/updateprofilepicture").put(auth, updateProfilePicture);

router.route("/forgetpassword").put(auth, updateProfilePicture);

router.route("/resetpassword").put(auth, updateProfilePicture);

router.route("/addtoplaylist").post(auth, addToPlaylist);

router.route("/removefromplaylist").delete(auth, removefromplaylist);


export default router;

