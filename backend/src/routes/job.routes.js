
import { Router } from "express";
import { verifyJWT } from "../middlerware/auth.middleware.js";
import {createJobPost,
	    updateApplicationStatus,
		getAllJobPost,
		applyForJob,
		getJobApplications,
		assignRecruitersAndR2Form ,
		shortlistCandidate
	
} from "../controller/job.controller.js"
import { upload } from "../utills/cloudinary.js";

const router=Router()

router.route('/create-job-post').post( createJobPost);
router.route('/update-application-status').patch(verifyJWT,updateApplicationStatus);
router.route('/get-job-post/:id').get(verifyJWT,getAllJobPost);
router.route('/apply-for-job').post(verifyJWT,upload.single('resume'),applyForJob);
router.route('/get-job-applications/:jobId').get(verifyJWT,getJobApplications);
router.route('/assign-recruiter-form').post( verifyJWT,assignRecruitersAndR2Form );
router.route('/shortlist-candidate').post(verifyJWT,shortlistCandidate)
 

export default router