import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(createProduct);
router.route("/:id/reviews").post(createProductReview);
router.route("/:id/deleted").put(deleteProduct);
router.route("/:id").get(getProductById).put(updateProduct);

export default router;
