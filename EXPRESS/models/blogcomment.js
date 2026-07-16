import mongoose from "mongoose";

const BlogCommentSchema = new mongoose.Schema({

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  comment: {
    type: mongoose.Schema.Types.String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  isApproved: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },} , 
  {timestamps: true}
);

const BlogComment = mongoose.model("BlogComment", BlogCommentSchema);
export default BlogComment;




