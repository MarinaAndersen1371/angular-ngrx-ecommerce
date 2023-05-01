import asyncHandler from "express-async-handler";
import generateToken from "../generateToken.js";
import User from "../models/userModel.js";
import Mail from "../models/mailModel.js";

//Desc: Login user
//Route: POST/api/users/login
//Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && !user.deleted && (await user.matchPassword(password))) {
    user.lastLogin = Date.now();
    await user.save();
    res.json({
      _id: user._id,
      firstName: user.firstName,
      username: user.username,
      email: user.email,
      isadmin: user.isadmin,
      isManager: user.isManager,
      isPrime: user.isPrime,
      isFranchise: user.isFranchise,
      testPaid: user.testPaid,
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
  const userAdmin = await User.findOne({ email: "admin@web.de" });

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
    lastLogin: Date.now(),
    lastModified: Date.now(),
    modifiedBy: username,
  });

  if (user && userAdmin) {
    const mail = new Mail({
      user: userAdmin._id,
      mailTarget: user.email,
      firstNameTarget: user.firstName,
      lastNameTarget: user.username,
      subject: `Welcome to MarWeb Trade, ${user.firstName}!`,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    });
    await mail.save();

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
//Access: Private / Admin
const getUsers = asyncHandler(async (req, res) => {
  const active = await User.find({ deleted: false });
  const removed = await User.find({ deleted: true });
  const users = { active, removed };

  var statistics,
    qtyPrime,
    qtyFranchise,
    qtyPrimeCoupon,
    qtyTestPaid,
    qtyTestCompleted,
    qtyTestFailed,
    qtyFemale,
    qtyMale,
    qtyPrivateCustomer,
    qtyWholesaleBusiness,
    qtyFranchiseMember;

  if (users) {
    qtyFemale = active.reduce(
      (acc, active) => (active.gender === "Female" ? 1 : 0) + acc,
      0
    );
    qtyMale = active.reduce(
      (acc, active) => (active.gender === "Male" ? 1 : 0) + acc,
      0
    );
    qtyPrivateCustomer = active.reduce(
      (acc, active) =>
        (active.purpose === "Private Customer" || active.purpose === "Other"
          ? 1
          : 0) + acc,
      0
    );
    qtyFranchiseMember = active.reduce(
      (acc, active) => (active.purpose === "Franchise Member" ? 1 : 0) + acc,
      0
    );
    qtyWholesaleBusiness = active.reduce(
      (acc, active) => (active.purpose === "Wholesale Business" ? 1 : 0) + acc,
      0
    );
    qtyPrime = active.reduce(
      (acc, active) => (active.isPrime ? 1 : 0) + acc,
      0
    );
    qtyFranchise = active.reduce(
      (acc, active) => (active.isFranchise ? 1 : 0) + acc,
      0
    );
    qtyTestPaid = active.reduce(
      (acc, active) => (active.testPaid ? 1 : 0) + acc,
      0
    );
    qtyTestCompleted = active.reduce(
      (acc, active) => (+active.testScore > 79 ? 1 : 0) + acc,
      0
    );
    qtyTestFailed = active.reduce(
      (acc, active) =>
        (+active.testScore < 80 && +active.testScore > 0 ? 1 : 0) + acc,
      0
    );
    qtyPrimeCoupon = active.reduce(
      (acc, active) => (active.coupon.trim() !== "" ? 1 : 0) + acc,
      0
    );

    statistics = {
      qtyPrime,
      qtyFranchise,
      qtyTestPaid,
      qtyTestCompleted,
      qtyTestFailed,
      qtyPrimeCoupon,
      qtyFemale,
      qtyMale,
      qtyPrivateCustomer,
      qtyWholesaleBusiness,
      qtyFranchiseMember,
    };
  }
  res.json({ users, statistics });
});

//Desc: Get user by Id
//Route: GET/api/users/:id
//Access: Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.deleted) {
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
  const warranty = req.body.warranty;
  const gift = req.body.gift;
  const extra1 = req.body.extra1;
  const extra2 = req.body.extra2;

  if (user && !user.deleted && user.cart) {
    const existItem = await user.cart.find(
      (x) => x._id.toString() === product._id.toString()
    );

    if (existItem) {
      if (+existItem.quantity + +qty <= +product.quantity) {
        existItem.quantity = +existItem.quantity + +qty;

        +existItem.quantity > 2
          ? (existItem.discount = 0.05)
          : (existItem.discount = 0);

        warranty === "Yes"
          ? (existItem.warranty = 0.02)
          : (existItem.warranty = 0);

        gift === "Yes" ? (existItem.gift = 5) : (existItem.gift = 0);

        extra1 === "Yes" ? (existItem.extra1 = 4) : (existItem.extra1 = 0);
        extra2 === "Yes" ? (existItem.extra2 = 5) : (existItem.extra2 = 0);
      } else {
        res.status(404);
        throw new Error("Product is out of stock");
        return;
      }
    } else {
      product.quantity = +qty;

      +product.quantity > 2
        ? (product.discount = 0.05)
        : (product.discount = 0);

      warranty === "Yes" ? (product.warranty = 0.02) : (product.warranty = 0);
      gift === "Yes" ? (product.gift = 5) : (product.gift = 0);
      extra1 === "Yes" ? (product.extra1 = 4) : (product.extra1 = 0);
      extra2 === "Yes" ? (product.extra2 = 5) : (product.extra2 = 0);

      user.cart.push(product);
    }
    user.subtotal = user.cart
      .reduce(
        (acc, product) =>
          acc +
          (+product.price * +product.quantity -
            +product.price * +product.quantity * +product.discount +
            +product.price * +product.quantity * +product.warranty +
            (+product.extra1 + +product.extra2) * +product.quantity +
            +product.gift),
        0
      )
      .toFixed(2);

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

  if (user && !user.deleted && user.cart && user.cart.length > 0) {
    const removedItem = await user.cart.find(
      (x) => x._id.toString() === item._id.toString()
    );
    if (removedItem) {
      user.cart.remove(removedItem);
      user.subtotal = user.cart.reduce(
        (acc, product) =>
          acc +
          (+product.price * +product.quantity -
            +product.price * +product.quantity * +product.discount +
            +product.price * +product.quantity * +product.warranty +
            (+product.extra1 + +product.extra2) * +product.quantity +
            +product.gift),
        0
      );
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
//Access: Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && !user.deleted) {
    user.firstName = req.body.firstName || user.firstName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.purpose = req.body.purpose || user.purpose;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;
    user.testPaid = req.body.testPaid ?? user.testPaid;
    user.testScore = req.body.testScore || user.testScore;
    user.coupon = req.body.coupon || user.coupon;
    user.isPrime = req.body.isPrime ?? user.isPrime;
    user.isFranchise = req.body.isFranchise ?? user.isFranchise;
    user.isManager = req.body.isManager ?? user.isManager;
    user.lastModified = Date.now();
    user.modifiedBy = "Admin";

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
  if (user && !user.deleted) {
    user.deleted = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: Update user profile
//Route: PUT/api/users/:id/profile
//Access: Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && !user.deleted) {
    user.firstName = req.body.firstName || user.firstName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.purpose = req.body.purpose || user.purpose;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;
    req.body.password && (user.password = req.body.password);
    user.lastModified = Date.now();
    user.modifiedBy = user.username;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Desc: User test completion
//Route: PUT/api/users/:id/test
//Access: Private
const userTest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && !user.deleted) {
    user.test.test1 = req.body.test1 || user.test.test1;
    user.test.test2 = req.body.test2 || user.test.test2;
    user.test.test3 = req.body.test3 || user.test.test3;
    user.test.test4 = req.body.test4 || user.test.test4;
    user.test.test5 = req.body.test5 || user.test.test5;

    var answer1, answer2, answer3, answer4, answer5;
    user.test.test1 === "A" ? (answer1 = 20) : (answer1 = 1);
    user.test.test2 === "B" ? (answer2 = 20) : (answer2 = 1);
    user.test.test3 === "C" ? (answer3 = 20) : (answer3 = 1);
    user.test.test4 === "D" ? (answer4 = 20) : (answer4 = 1);
    user.test.test5 === "A" ? (answer5 = 20) : (answer5 = 1);

    user.testScore = +answer1 + +answer2 + +answer3 + +answer4 + +answer5;
    if (+user.testScore > 79) {
      user.isFranchise = true;
      user.franchiseFrom = Date.now();
    }

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
  updateUser,
  getUserById,
  addToCart,
  removeFromCart,
  updateProfile,
  userTest,
};
