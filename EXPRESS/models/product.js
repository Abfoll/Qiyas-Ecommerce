import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Product name is required'],
      trim: true, maxlength: 150 
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'] 
    },
    price: { 
      type: Number, 
      required: [true, 'Price is required'], 
      min: [0, 'Price cannot be negative'] 
    },
    comparePrice: { 
      type: Number, 
      min: 0 
    }, 
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    },
    brand: { 
      type: String, 
      trim: true 
    },
    sku: { 
      type: String, 
      unique: true, 
      sparse: true, 
      trim: true 
    },
    stock: { 
      type: Number, 
      required: true, 
      min: [0, 'Stock cannot be negative'], 
      default: 0 
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: String,
      },
    ],
    variants: [
      {
        name: String, // e.g. "Size", "Color"
        options: [String], // e.g. ["S", "M", "L"]
      },
    ],
    ratingsAverage: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 5, 
      set: (val) => Math.round(val * 10) / 10 
    },
    ratingsCount: { 
      type: Number, 
      default: 0
     },
    isFeatured: { 
      type: Boolean, 
      default: 
      false 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
  },
  { timestamps: true}
);




const Product = mongoose.model('Product', ProductSchema);
export default Product;
