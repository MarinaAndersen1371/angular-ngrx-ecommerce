import asyncHandler from "express-async-handler";
import Mail from "../models/mailModel.js";
import User from "../models/userModel.js";

//Desc: Create new mail
//Route: POST/api/mails
//Access: Private
const createMail = asyncHandler(async (req, res) => {
  const { mailTarget, subject, message } = req.body;

  const user = await User.findById(req.body.userId);

  const userEmail = await User.findOne({
    email: req.body.mailTarget,
  });
  const emailAddress = userEmail.email;
  const lastNameTarget = userEmail.username;
  const firstNameTarget = userEmail.firstName;

  if (user && !user.deleted && emailAddress) {
    const mail = new Mail({
      user: req.body.userId,
      mailTarget,
      firstNameTarget,
      lastNameTarget,
      subject,
      message,
    });
    const createdMail = await mail.save();
    res.status(201).json(createdMail);
  } else {
    res.status(404);
    throw new Error("Invalid Data");
  }
});

//Desc:Get Mail by Id
//Route: GET/api/mails/:id
//Access: Private
const getMailById = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id).populate(
    "user",
    "firstName username email"
  );
  if (mail) {
    res.json(mail);
  } else {
    res.status(404);
    throw new Error("Mail not found");
  }
});

//Desc:Get all Mails
//Route: GET/api/mails
//Access: Private
const getMails = asyncHandler(async (req, res) => {
  const mails = await Mail.find({}).populate(
    "user",
    "firstName username email"
  );
  res.json(mails);
});

//Desc: Delete Incoming Mail
//Route: put/api/mails/:id/in
//Access: Private
const deleteIn = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id);
  if (mail) {
    mail.deletedIn = true;
    const updatedMail = await mail.save();
    res.json(updatedMail);
  } else {
    res.status(404);
    throw new Error("Mail not found");
  }
});

//Desc: Delete Incoming Mail
//Route: put/api/mails/:id/out
//Access: Private
const deleteOut = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id);
  if (mail) {
    mail.deletedOut = true;
    const updatedMail = await mail.save();
    res.json(updatedMail);
  } else {
    res.status(404);
    throw new Error("Mail not found");
  }
});

//Desc: Update Mail Status
//Route: PUT/api/mails/:id
//Access: Private
const updateMail = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id);
  if (mail) {
    mail.status = !mail.status;
    const updatedMail = await mail.save();
    res.json(updatedMail);
  } else {
    res.status(404);
    throw new Error("Mail not found");
  }
});

//Desc: Update Mail to Open
//Route: PUT/api/mails/:id/open
//Access: Private
const openMail = asyncHandler(async (req, res) => {
  const mail = await Mail.findById(req.params.id);
  if (mail) {
    mail.open = true;
    const updatedMail = await mail.save();
    res.json(updatedMail);
  } else {
    res.status(404);
    throw new Error("Mail not found");
  }
});

export {
  createMail,
  getMailById,
  getMails,
  deleteOut,
  deleteIn,
  updateMail,
  openMail,
};
