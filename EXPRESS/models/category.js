import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Category name is required'], 
      trim: true, unique: true 
    },
    description: {
       type: String, 
       trim: true 
      },
    image: {
      url: String
    },
    parent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      default: null 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);



const Category = mongoose.model('Category', CategorySchema);
export default Category;