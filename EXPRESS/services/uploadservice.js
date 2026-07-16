import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a single in-memory buffer (from Multer) to Cloudinary via a stream.
 * Returns { url, publicId } — publicId is stored on the document so we can
 * delete the image from Cloudinary later.
 */
const uploadBuffer = (buffer, folder = 'ecommerce') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url, publicId: result.public_id });
    });
    stream.end(buffer);
  });
};

const uploadMultiple = (files, folder = 'ecommerce') => {
  return Promise.all(files.map((file) => uploadBuffer(file.buffer, folder)));
};

const deleteImage = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};

export { uploadBuffer, uploadMultiple, deleteImage };
