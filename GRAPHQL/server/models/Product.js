import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    badge: { type: String, default: "" },
    stock: { type: Number, default: 0, min: 0 },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);