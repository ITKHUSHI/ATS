import mongoose from "mongoose";

const jobSchema =new mongoose.Schema({
	
	recruiterId:{
		type:mongoose.Schema.ObjectId,
		ref:'User',
		required:true,
	},
	companyName:{
		type:String,
		required:true
	},
	recruiterName:{
		type:String,
		required:true,
	},
	postName:{
		type:String,
		required:true,
	},
	keySkills:{
		type:String,
		required:true,
	},
	responsibilities:{
		type:String,
		reqired:true,
	},
	jobDescription:{
		type:String,
		required:true,
	},
	location:{
		type:String,
		required:true,
	},
	salary:{
		type:String,
		required:true,

	},
	r2Form: {
		type: [String],
		
		required: true,
	  },
	  shortlistedCandidates: [{
		candidateId: { 
			type: mongoose.Schema.ObjectId,
			ref: 'User' },
			jobId:String,
		message: String,
		
		
	  }],

	applications:[
		{
			candidate:{
				type:mongoose.Schema.ObjectId,
				ref:'User',

		      },
			  resume: { type: String, required: true },
              contact: { type: String, required: true },
              email: { type: String, required: true },
			  q1: { type: String, required: true },
			  q2: { type: String, required: true },
			  q3: { type: String, required: true },
			  q4: { type: String, required: true },
			  q5: { type: String, required: true },
			  status:{
				type:String,
				enum:['Applied', 'Viewed', 'Interview', 'Hired'],
				default:'Applied'

			  }
		}
	]

},
{
	timestamps:true,
}

)


export const Job= mongoose.model("job",jobSchema)