import express from "express";
const router = express.Router();
//import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  openTicket,
  updateTicket,
} from "../controllers/ticketController.js";

router.route("/").post(createTicket).get(getTickets);
router.route("/:id").get(getTicketById).delete(deleteTicket).put(updateTicket);
router.route("/:id/open").put(openTicket);

export default router;
