require("dotenv").config()
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


/////////////////////////
// Uploads an image file
/////////////////////////
exports.uploadImage = async (imagePath) => {

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.uploadVideo = async (videoPath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    resource_type: "video", // Ensure it handles video
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };

  try {
    // Upload the video
    const result = await cloudinary.uploader.upload(videoPath, options);
    return result.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.uploadVideo = async (videoPath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    resource_type: "video", // Ensure it handles video
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
}