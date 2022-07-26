import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "New" },
    commentAdmin: { type: String, required: true, default: "No Comment" },
    open: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
