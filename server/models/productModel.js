import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0.0 },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
