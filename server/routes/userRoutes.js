import express from "express";
const router = express.Router();
import {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  getUserById,
  addToCart,
  removeFromCart,
  updateProfile,
  updateUser,
  userTest,
} from "../controllers/userController.js";
import {
  updateTestScore,
  updatePrimeCoupon,
  updateUserPassword,
} from "../controllers/managerUserController.js";

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(loginUser);
router.route("/:id/remove").put(removeFromCart);
router.route("/:id/edit").put(updateUser);
router.route("/:id/profile").put(updateProfile);
router.route("/:id/test").put(userTest);
router.route("/:id/testscore").put(updateTestScore);
router.route("/:id/coupon").put(updatePrimeCoupon);
router.route("/:id/resetpassword").put(updateUserPassword);
router.route("/:id/deleted").put(deleteUser);
router.route("/:id").get(getUserById).put(addToCart);

export default router;
