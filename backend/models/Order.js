import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name:    { type: String, required: true },
        image:   { type: String },
        price:   { type: Number, required: true },
        qty:     { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status:     { type: String, default: "Processing", enum: ["Processing", "Shipped", "Delivered", "Cancelled"] },
    isPaid:     { type: Boolean, default: false },
    paidAt:     { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);