import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
    name:    { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    price:        { type: Number, required: true, min: 0 },
    description:  { type: String, default: "" },
    image:        { type: String, default: "" },
    brand:        { type: String, default: "" },
    category:     { type: String, default: "" },
    countInStock: { type: Number, required: true, default: 0, min: 0 },
    rating:       { type: Number, default: 0 },
    numReviews:   { type: Number, default: 0 },
    reviews:      [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);