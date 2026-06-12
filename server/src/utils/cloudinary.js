import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteLocalFile = (filePath) => {
    try {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Failed to delete local file at ${filePath}:`, error.message);
        return false;
    }
};

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        return { success: false, error: "File path is required" };
    }

    if (!fs.existsSync(localFilePath)) {
        return { success: false, error: `File not found at ${localFilePath}` };
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        
        deleteLocalFile(localFilePath);
        return { success: true, data: response };
    } catch (error) {
        deleteLocalFile(localFilePath);
        console.error("Error uploading to Cloudinary:", error.message);
        return { success: false, error: error.message || "Upload failed" };
    }
};

const deleteFromCloudinary = async (public_id, resource_type = "image") => {
    if (!public_id) {
        return { success: false, error: "Public ID is required" };
    }

    try {
        await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type,
        });
        return { success: true };
    } catch (error) {
        console.error(`Error deleting from Cloudinary (${public_id}):`, error.message);
        return { success: false, error: error.message || "Deletion failed" };
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };