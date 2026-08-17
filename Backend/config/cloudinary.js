import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_API,
});

const uploadCloud = async (filePath) => {
  try {
    if (!filePath) return null;
    let result = await cloudinary.uploader.upload(filePath);
    console.log(result);
    fs.unlinkSync(filePath); // delete image from upload folder
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
  }
};

export default uploadCloud;
