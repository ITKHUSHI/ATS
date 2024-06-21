import { ApiError } from '../utills/ApiError.js';
import { asyncHandler } from '../utills/asyncHandler.js';
import  jwt  from 'jsonwebtoken';
import { User } from '../modle/user.modle.js';

 // we used _ placed of response (res)
export const verifyJWT= asyncHandler(async(req , _ , next) =>{
try {
	const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
	   if(!token){
		throw new ApiError(401, "unauthorized request");
	   }
	//    console.log(token,"backend token");
	   const decotedToken=  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) 
	   const user= await User.findById(decotedToken?._id).select("-password -refreshToken")
	   if(!user){
		throw new ApiError(401,"invailid access Token")
	   }
	   req.user=user;
	   next()
	   
} catch (error) {
	throw new ApiError(401 ,error?.message ||"Invalid access token")
} 
})