import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true, default: " " },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    pricePurchase: { type: Number, required: true, default: 0.0 },
    price: { type: Number, required: true, default: 0.0 },
    quantity: { type: Number, required: true, default: 0 },
    extra: { type: Boolean, required: true, default: false },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    lastModified: { type: Date },
    modifiedBy: { type: String, required: true, default: " " },
    deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
