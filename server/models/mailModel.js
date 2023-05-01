import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    mailTarget: { type: String, required: true },
    firstNameTarget: { type: String, required: true },
    lastNameTarget: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    open: { type: Boolean, required: true, default: false },
    deletedIn: { type: Boolean, required: true, default: false },
    deletedOut: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Mail = mongoose.model("Mail", mailSchema);

export default Mail;
