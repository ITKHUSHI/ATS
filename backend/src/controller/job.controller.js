import { Job } from "../modle/job.modle.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import mongoose from "mongoose";


  const createJobPost = asyncHandler (async(req,res) =>{
	// req-body
	// check data fetch or not
	// creating a post
	// save post
	// check post exist or not 
	const {recruiterId,companyName,recruiterName, postName, keySkills, responsibilities , jobDescription,location , salary}=req.body;
	if( !(recruiterId && companyName && recruiterName && postName &&  keySkills && responsibilities && jobDescription && location && salary)){
		throw new ApiError(400 ,"All fields are required");

	} 

	const jobPost=new Job({
		recruiterId,
		companyName,
	    recruiterName, 
		postName, 
		keySkills, 
		responsibilities, 
		jobDescription,
		location,
		salary
	})
   const savedJob=await jobPost.save();
  if (!savedJob) {
	throw new ApiError(500, "Something went wrong while creating post")
}

return res.status(201).json(
	new ApiResponse(200, savedJob, "successfully created post")
)
})

const getAllJobPost = asyncHandler(async(req,res)=>{
	const jobId=req.params;
	const jobPost= await Job.find();
	if(!jobPost){
		throw new ApiError(400, "job Post not found")
	
	}
	return res
	       .status(200)
		   .json(new ApiResponse(200,jobPost,"all post fetch successfully"))
})
const applyForJob = asyncHandler(async(req,res)=>{
  // job id , candidate information
  //jobID exsist or not
  // push jobapplications
  const{jobId , candidateId,contact , email,q1, q2, q3, q4, q5, }=req.body
  const resume= req.file.path;
//   console.log(jobId ,candidateId,contact, email,q1,q2,q3,q4,q5,resume);

  if(
	[jobId,candidateId,resume ,contact, email,q1, q2, q3, q4, q5, ].some((field)=>field?.trim=== "")){
		throw new ApiError(400, "All fields are required");
	}
	const job=await Job.findById(jobId);
	if(!job){
		throw new ApiError(400, "no jobs exist");
	
	}
	job.applications.push({candidateId,resume,contact,email,q1, q2, q3, q4, q5, });

	await job.save();
	return res
	       .status(200)
		   .json(new ApiResponse(200,job,"Applied to job successfully"));
});

const updateApplicationStatus= asyncHandler(async(req,res)=>{
	const {jobId,candidateId, status}=req.body;
	const job= await Job.findById(jobId);
	if(!job){
		throw new ApiError(400, " job not found");
	
	}
	const application=job.applications.find( (app)=> app?.candidate?.equals(candidateId))
	if(!application){
		throw new ApiError(400, "Application not found");
	
	}
	application.status=status;
	await job.save();
	return res
	       .status(200)
		   .json(new ApiResponse(200,job,"Applicatio status updated successfully"));
})

const getJobApplications=asyncHandler(async(req,res)=>{
	const { jobId } = req.params;
	const job = await Job.findById(jobId).populate({
	  path: 'applications.candidate',
	  select: 'fullname email contact skills certificates resume workExperience education'
	});
  
	if (!job) {
	  throw new ApiError(404, "Job not found");
	}
  
	return res.status(200).json(new ApiResponse(200, job, "Job and applications fetched successfully"));
})


const assignRecruitersAndR2Form = asyncHandler(async (req, res) => {
  const { jobId, recruiterId, r2Form } = req.body;
 console.log(jobId,recruiterId,r2Form)
  // Validate incoming data
  if (!jobId || !recruiterId || !r2Form) {
    throw new ApiError(400, "JobID, recruiterID, and R2form data are required");
  }

  // Fetch job by ID
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Assign recruiters to the job
  job.recruiterId = recruiterId;

  // Update R2 form in job details
  job.r2Form = r2Form;

  // Save updated job details
  await job.save();

  return res.status(200).json(new ApiResponse(200, job, "Recruiters assigned and R2 form added successfully"));
});



const shortlistCandidate = asyncHandler(async (req, res) => {
  const { jobId, candidateId, message } = req.body;

  if (!jobId || !candidateId || !message) {
    return res.status(400).json({ message: "JobID, CandidateID, and message are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(candidateId)) {
   console.log(jobId,candidateId)
    throw new ApiError(400,{ message: "Invalid JobID or CandidateID" });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const application = job.applications.find(app => app._id.toString() === candidateId);
  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  job.shortlistedCandidates.push({ candidateId: mongoose.Types.ObjectId(candidateId), message });

  await job.save();

  return res.status(200).json({ message: "Candidate shortlisted and message sent successfully" });
});









export{ 
	createJobPost,
	applyForJob,
	getAllJobPost,
	updateApplicationStatus,
	getJobApplications,
	assignRecruitersAndR2Form ,
	shortlistCandidate,
}