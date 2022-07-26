import express from "express";
const router = express.Router();
//import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  getUserById,
  addToCart,
  removeFromCart,
  updateAdminUser,
  updateProfile,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);
router.route("/:id/remove").put(removeFromCart);
router.route("/:id/edit").put(updateAdminUser);
router.route("/:id/profile").put(updateProfile);
router.route("/login").post(loginUser);
router.route("/:id").delete(deleteUser).get(getUserById).put(addToCart);

export default router;
