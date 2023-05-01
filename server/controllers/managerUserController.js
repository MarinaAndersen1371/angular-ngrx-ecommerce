import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//Desc:Update user test score
//Route: PUT/api/users/:id/testscore
//Access: Private / Manager
const updateTestScore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.deleted) {
    user.testScore = req.body.testScore || user.testScore;
    user.lastModified = Date.now();
    user.modifiedBy = "Manager";

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc:Update user coupon
//Route: PUT/api/users/:id/testscore
//Access: Private / Manager
const updatePrimeCoupon = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.deleted && user.isPrime) {
    user.coupon = req.body.coupon || user.coupon;
    user.lastModified = Date.now();
    user.modifiedBy = "Manager";

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc:Update user password
//Route: PUT/api/users/:id/passwordreset
//Access: Private / Manager
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.deleted) {
    user.password = "123456";
    user.lastModified = Date.now();
    user.modifiedBy = "Manager";

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { updateTestScore, updatePrimeCoupon, updateUserPassword };
