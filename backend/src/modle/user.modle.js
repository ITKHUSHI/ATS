import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const userSchema = new Schema({
	fullname:{
		type:String,
		required:true,
		trim:true,
		index:true,
	},
	email:{
		type:String,
		required:true,
		unique:true,
		lowecase: true,
		trim:true
		
	},
	contact:{
		type:String,
		required:true,
		
	},
	password:{
		type:String,
		required:[true,"password is required"]
	},
	role: {
		type: String,
		enum: ['Candidate', 'Coordinator', 'Recruiter', 'Employer'],
		default: 'Candidate' // Default role
	  },
	refreshToken:{
		type:String
	}
},
	{
		timestamps:true
	
    }
)
userSchema.pre("save",async function(next){
	if(!this.isModified("password")) {
		return next();
	}
     this.password= await bcrypt.hash(this.password,8)
	   next();
})

userSchema.methods.isPasswordCorrect=async function(password){
	// console.log("schema" ,password , this.password);
 const result=await	bcrypt.compare(password,this.password)
  return result;
}



userSchema.methods.generateAccessToken=function(){
	return jwt.sign(
		{
			_id:this._id,
			email:this.email,
			username:this.username,
			fullname:this.fullname
		},
		process.env.ACCESS_TOKEN_SECRET,
		
		{
			expiresIn:process.env.ACCESS_TOKEN_EXPIRY
		}
	)
}
userSchema.methods.generateRefreshToken=function(){
	return jwt.sign(
		{
			_id: this._id
		},
			
		 process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn:process.env.REFRESH_TOKEN_EXPIRY
		}
	)
}


export const User= mongoose.model("User",userSchema)