import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "New" },
    commentAdmin: { type: String, required: true, default: "No Comment" },
    commentManager: { type: String, required: true, default: "No Comment" },
    timeAdmin: { type: Number, required: true, default: 0.0 },
    timeManager: { type: Number, required: true, default: 0.0 },
    open: { type: Boolean, required: true, default: false },
    lastModified: { type: Date },
    modifiedBy: { type: String, required: true, default: " " },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
