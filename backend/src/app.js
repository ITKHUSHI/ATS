import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app= express()
app.use(cors({
	origin: 'http://localhost:8000' ,   //process.env.CORS_ORIGIN ,
	credentials: true
}))
app.use(express.json({limit: "160000kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";
import  { verifyJWT } from "./middlerware/auth.middleware.js"
import { roleMiddleware } from "./middlerware/userRole.middleware.js";
import { updateCandidateProfile } from "./controller/user.controller.js";
import jobRouter from "./routes/job.routes.js"


app.use('/api/v1/users',userRouter);
app.use('/api/v1/jobs',jobRouter);



app.get('/api/v1/coordinator/dashboard'), (req, res) => {
	res.send('Coordinator Dashboard');
  }
  app.get('/api/v1/recruiter/dashboard',verifyJWT, (req, res) => {
	res.send('Recruiter Dashboard');})
	
	app.get('/api/v1/employer/dashboard', verifyJWT,roleMiddleware(['Employer']), (req, res) => {
		res.send('Employer Dashboard');
	  });
	  
	  app.get('/api/v1/users/candidate/dashboard',verifyJWT, (req, res) => {
		const candidateDetails=updateCandidateProfile(id, fullname, email, contact, skills, certificates, resume, workExperience, education );
		res.send(candidateDetails);
	  });




export  { app }