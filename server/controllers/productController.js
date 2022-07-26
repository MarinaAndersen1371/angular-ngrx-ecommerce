import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Desc: Fetch all products
//Route: GET/api/products
//Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//Desc:Get product by Id
//Route: GET/api/products/:id
//Access: Private
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Create product
//Route: POST/api/products
//Access: Private / Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, imageUrl, description, quantity } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    imageUrl,
  });

  if (product) {
    res.json({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//Desc: Update product
//Route: PUT/api/products/:id
//Access: Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.imageUrl = req.body.imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Delete product
//Route: DELETE/api/products/:id
//Access: Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product has been deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
