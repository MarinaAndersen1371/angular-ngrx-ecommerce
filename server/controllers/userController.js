import asyncHandler from "express-async-handler";
import generateToken from "../generateToken.js";
import User from "../models/userModel.js";

//Desc: Login user
//Route: POST/api/users/login
//Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      username: user.username,
      email: user.email,
      isadmin: user.isadmin,
      isManager: user.isManager,
      isPrime: user.isPrime,
      isFranchise: user.isFranchise,
      coupon: user.coupon,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid data");
  }
});

//Desc: Register user
//Route: POST/api/users
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    username,
    email,
    password,
    phone,
    purpose,
    birthday,
    gender,
  } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("This Email is already registered");
  }

  const user = await User.create({
    firstName,
    username,
    email,
    password,
    phone,
    purpose,
    birthday,
    gender,
  });
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      username: user.username,
      email: user.email,
      isadmin: user.isadmin,
      isManager: user.isManager,
      isPrime: user.isPrime,
      isFranchise: user.isFranchise,
      coupon: user.coupon,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Desc: Fetch all users
//Route: GET/api/users
//Access: Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//Desc: Get user by Id
//Route: GET/api/users/:id
//Access: Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Add product to cart
//Route: PUT/api/users/:id
//Access: Private
const addToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const product = req.body.item;
  const qty = req.body.qty;
  const warranty1 = req.body.warranty;
  const gift1 = req.body.gift;

  if (user && user.cart) {
    const existItem = await user.cart.find(
      (x) => x._id.toString() === product._id.toString()
    );
    if (existItem) {
      existItem.quantity = existItem.quantity + +qty;

      +existItem.quantity > 2
        ? (existItem.discount = 0.05)
        : (existItem.discount = 0);

      warranty1 === "Yes" || existItem.warranty > 0
        ? (existItem.warranty = 0.02)
        : (existItem.warranty = 0);

      gift1 === "Yes" || existItem.gift > 0
        ? (existItem.gift = 5)
        : (existItem.gift = 0);
    } else {
      product.quantity = qty;

      +product.quantity > 2
        ? (product.discount = 0.05)
        : (product.discount = 0);

      warranty1 === "Yes" ? (product.warranty = 0.02) : (product.warranty = 0);

      gift1 === "Yes" ? (product.gift = 5) : (product.gift = 0);

      user.cart.push(product);
    }

    user.subtotal = user.cart.reduce(
      (acc, product) =>
        acc +
        (+product.price * +product.quantity -
          +product.price * +product.quantity * +product.discount +
          +product.price * +product.quantity * +product.warranty +
          product.gift),
      0
    );
    user.qtyItems = user.cart.reduce((acc, item) => +item.quantity + acc, 0);

    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Remove item from cart
//Route: PUT/api/users/:id/remove
//Access: Private
const removeFromCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const item = req.body.item;

  if (user && user.cart && user.cart.length > 0) {
    const removedItem = await user.cart.find(
      (x) => x._id.toString() === item._id.toString()
    );
    if (removedItem) {
      user.subtotal =
        +user.subtotal -
        +removedItem.price * +removedItem.quantity +
        +removedItem.price * +removedItem.quantity * +removedItem.discount -
        +removedItem.price * +removedItem.quantity * +removedItem.warranty -
        removedItem.gift;

      removedItem.quantity = 0;
      removedItem.discount = 0;
      removedItem.warranty = 0;
      removedItem.gift = 0;

      user.qtyItems = user.cart.reduce((acc, item) => +item.quantity + acc, 0);

      await user.save();
      res.json(user);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Update user
//Route: PUT/api/users/:id
//Access: Private Admin
const updateAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.purpose = req.body.purpose || user.purpose;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Delete user
//Route: DELETE/api/users/:id
//Access: Private Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User has been deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Update user
//Route: PUT/api/users/:id/profile
//Access: Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.purpose = req.body.purpose || user.purpose;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;
    req.body.password && (user.password = req.body.password);

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  updateAdminUser,
  getUserById,
  addToCart,
  removeFromCart,
  updateProfile,
};
