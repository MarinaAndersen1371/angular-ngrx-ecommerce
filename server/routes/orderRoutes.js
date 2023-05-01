import express from "express";
const router = express.Router();
import {
  getOrders,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToSent,
  updateOrderToDelivered,
  updateInvoiceToSent,
  updateCustomerVoucher,
  updateReturnToActive,
  updateReturnToReceived,
  updateRefundToPaid,
  updateReturnToClosed,
} from "../controllers/orderController.js";

router.route("/").get(getOrders).post(addOrderItems);
router.route("/:id").get(getOrderById);
router.route("/:id/paid").put(updateOrderToPaid);
router.route("/:id/sent").put(updateOrderToSent);
router.route("/:id/deliver").put(updateOrderToDelivered);
router.route("/:id/invoice").put(updateInvoiceToSent);
router.route("/:id/voucher").put(updateCustomerVoucher);
router.route("/:id/requestreturn").put(updateReturnToActive);
router.route("/:id/refund").put(updateRefundToPaid);
router.route("/:id/returnreceived").put(updateReturnToReceived);
router.route("/:id/returnclosed").put(updateReturnToClosed);

export default router;
