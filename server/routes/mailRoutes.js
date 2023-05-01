import express from "express";
const router = express.Router();
import {
  createMail,
  getMailById,
  getMails,
  deleteOut,
  deleteIn,
  updateMail,
  openMail,
} from "../controllers/mailController.js";

router.route("/").post(createMail).get(getMails);
router.route("/:id/open").put(openMail);
router.route("/:id/in").put(deleteIn);
router.route("/:id/out").put(deleteOut);
router.route("/:id").get(getMailById).put(updateMail);

export default router;
