import mongoose from "mongoose";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Ticket from "./models/ticketModel.js";
import Mail from "./models/mailModel.js";
import Order from "./models/orderModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const admin = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: admin };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Ticket.deleteMany();
    await Mail.deleteMany();
    await Order.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
