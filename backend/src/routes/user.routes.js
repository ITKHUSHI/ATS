import { Router } from "express";
import {
	registerUser,
	loginUser,
	refreshAccessToken,
	getCurrentUser,
	logoutUser,
	updateCandidateProfile,
}
from '../controller/user.controller.js';
import { verifyJWT } from "../middlerware/auth.middleware.js";
import { upload } from "../utills/cloudinary.js";

 
const router=Router()
router.route("/singup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/get-current-user").get(getCurrentUser);
router.route("/update-candidate-details").patch( verifyJWT, upload.single('resume'),updateCandidateProfile);


export default router;    