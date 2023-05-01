import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Desc: Fetch all products
//Route: GET/api/products
//Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ deleted: false });
  const topProducts = await Product.find({ deleted: false })
    .sort({ rating: -1 })
    .limit(5);

  var statistics, qtyExtra, qtyStock, qtyExtraStock;

  qtyExtra = products.reduce(
    (acc, product) => (product.extra ? 1 : 0) + acc,
    0
  );

  qtyExtraStock = products.reduce(
    (acc, product) => (product.extra ? +product.quantity : 0) + acc,
    0
  );

  qtyStock = products.reduce((acc, product) => +product.quantity + acc, 0);

  statistics = { qtyExtra, qtyStock, qtyExtraStock };
  res.json({ products, topProducts, statistics });
});

//Desc:Get product by Id
//Route: GET/api/products/:id
//Access: Private
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && !product.deleted) {
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
  const {
    name,
    brand,
    category,
    description,
    pricePurchase,
    price,
    quantity,
    extra,
    imageUrl,
    modifiedBy,
  } = req.body;
  const product = await Product.create({
    name,
    brand,
    category,
    description,
    pricePurchase,
    price,
    quantity,
    extra,
    imageUrl,
    modifiedBy,
    lastModified: Date.now(),
  });

  if (product) {
    res.json({
      _id: product._id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      pricePurchase: product.pricePurchase,
      price: product.price,
      quantity: product.quantity,
      extra: product.extra,
      imageUrl: product.imageUrl,
      modifiedBy: product.modifiedBy,
      lastModified: product.lastModified,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//Desc: Update product
//Route: PUT/api/products/:id
//Access: Private / Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && !product.deleted) {
    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.pricePurchase = req.body.pricePurchase || product.pricePurchase;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.extra = req.body.extra ?? product.extra;
    product.imageUrl = req.body.imageUrl || product.imageUrl;
    product.modifiedBy = req.body.modifiedBy;
    product.lastModified = Date.now();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Delete product
//Route: PUT/api/products/:id/deleted
//Access: Private / Admin / Manager
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && !product.deleted) {
    product.deleted = true;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { userName, userId, rating, comment } = req.body;
  if (req.body.comment.trim() === "") {
    res.status(400);
    throw new Error("No comment to submit");
  }

  const product = await Product.findById(req.params.id);

  if (product && !product.deleted) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.userId.toString() === req.body.userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      userName: req.body.userName,
      userId: req.body.userId,
      rating: +req.body.rating,
      comment: req.body.comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => +item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
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
  createProductReview,
};
