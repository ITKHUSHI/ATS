import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
import { User } from "../modle/user.modle.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import jwt from "jsonwebtoken"
import { upload } from "../utills/cloudinary.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullname, email, contact, password ,role} = req.body
    console.log("email: ", email);

    if (
        [fullname, email, contact, password ,role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const newUser = await User.create({
        contact,
        email, 
        password,
        fullname,
        role: role || 'Candidate'
    })
        await newUser.save();
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, password} = req.body
    // console.log(email,": eamil" , "password :",password);
    // console.log(email);

    if ( !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    await loggedInUser.save()
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

});

const getCurrentUser = asyncHandler(async(req, res) => {
    // const user=await User.findById(req.user._id).select('-password','-accessToken');
    // if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    )) 
})
  

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})
// backend/src/controllers/candidate.controllers.js

const updateCandidateProfile = async (req, res) => {
    
       // Assuming you have a middleware to set req.user
    
      const {id, fullname, email, contact, skills, certificates, workExperience, education } = req.body;
      const resumeLocalPath=req.files?.resume[0]?.path;
      const resume=await upload(resumeLocalPath)
  
      const updatedProfile = {
        id,
        fullname,
        email,
        contact,
        skills,
        certificates, 
        resume:resume?.url || "",
        workExperience, 
        education,
      };
  
      // Update the candidate profile in the database
      const candidate = await User.findByIdAndUpdate(id, updatedProfile, { new: true });
      if(!candidate){
        throw new ApiError(401, "user details not update")
      }
      await candidate.save();
      res
      .status(200)
      .json(new ApiResponse(200, candidate, "User details update"));
    
  };
  
 
   
 

export{
	registerUser,
	loginUser,
    logoutUser,
    getCurrentUser,
	refreshAccessToken,
    updateCandidateProfile,

}