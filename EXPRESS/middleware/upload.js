import multer from "multer";
import { ApiError } from "../utils/apiresponse.js";

// Store files in memory as a Buffer -> we stream that buffer straight to Cloudinary,

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new ApiError(400, 'Only .jpeg, .png and .webp images are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 6 }, // 5MB per file, max 6 files
});

export default upload;
