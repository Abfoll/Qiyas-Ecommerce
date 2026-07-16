import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, unique: true, lowercase: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String, maxlength: 300 },
    coverImage: { url: String, publicId: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);


                 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
export default BlogPost;