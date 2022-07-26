import express from "express";
const router = express.Router();
//import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getMyOrders,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToSent,
  updateOrderToDelivered,
  updateInvoiceToSent,
  getAdminOrders,
} from "../controllers/orderController.js";

router.route("/").get(getMyOrders).post(addOrderItems);
router.route("/admin").get(getAdminOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/paid").put(updateOrderToPaid);
router.route("/:id/sent").put(updateOrderToSent);
router.route("/:id/deliver").put(updateOrderToDelivered);
router.route("/:id/invoice").put(updateInvoiceToSent);

export default router;
