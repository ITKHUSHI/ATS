import  multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';          
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dt9idhkhd" ,                              //process.env.CLOUDINARY_CLOUD_NAME,
  api_key: "184941951553111",              // process.env.CLOUDINARY_API_KEY,
  api_secret: "4vkFeke4t84jLsn-07u-hj0HOCQ",                        //process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resume', // folder where you want to store resumes
    allowed_formats: ['pdf', 'doc', 'docx'], // allowed formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // optional transformations
  }
});

export const upload = multer({ storage: storage });

 