import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

//Desc: Fetch all orders
//Route: GET/api/orders
//Access: Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "user",
    "_id firstName username"
  );
  res.json(orders);
});

//Desc: Fetch all admin orders
//Route: GET/api/orders/admin
//Access: Private / Admin
const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "user",
    "_id firstName username"
  );

  var statistics,
    totalPrice,
    totalPaid,
    totalNotPaid,
    qtyPaid,
    qtyNotPaid,
    totalTax,
    taxPaid,
    taxNotPaid,
    totalShipping,
    shippingPaid,
    shippingNotPaid,
    qtyStandard,
    qtyFree,
    qtyFastest,
    qtySent,
    qtyNotSent,
    qtyDelivered;
  if (orders) {
    totalPrice = orders
      .reduce((acc, order) => acc + +order.totalPrice, 0)
      .toFixed(2);
    totalPaid = orders
      .reduce((acc, order) => (order.isPaid ? +order.totalPrice : 0) + acc, 0)
      .toFixed(2);
    totalNotPaid = orders
      .reduce((acc, order) => (!order.isPaid ? +order.totalPrice : 0) + acc, 0)
      .toFixed(2);
    qtyPaid = orders.reduce((acc, order) => (order.isPaid ? 1 : 0) + acc, 0);
    qtyNotPaid = orders.reduce(
      (acc, order) => (!order.isPaid ? 1 : 0) + acc,
      0
    );
    taxPaid = orders
      .reduce((acc, order) => (order.isPaid ? +order.taxPrice : 0) + acc, 0)
      .toFixed(2);
    taxNotPaid = orders
      .reduce((acc, order) => (!order.isPaid ? +order.taxPrice : 0) + acc, 0)
      .toFixed(2);
    shippingPaid = orders
      .reduce(
        (acc, order) => (order.isPaid ? +order.shippingPrice : 0) + acc,
        0
      )
      .toFixed(2);
    shippingNotPaid = orders
      .reduce(
        (acc, order) => (!order.isPaid ? +order.shippingPrice : 0) + acc,
        0
      )
      .toFixed(2);
    qtyStandard = orders.reduce(
      (acc, order) => (+order.shippingPrice === 5 ? 1 : 0) + acc,
      0
    );
    qtyFree = orders.reduce(
      (acc, order) => (+order.shippingPrice === 0 ? 1 : 0) + acc,
      0
    );
    qtyFastest = orders.reduce(
      (acc, order) => (+order.shippingPrice === 10 ? 1 : 0) + acc,
      0
    );
    qtySent = orders.reduce((acc, order) => (order.isSent ? 1 : 0) + acc, 0);
    qtyNotSent = orders.reduce(
      (acc, order) => (!order.isSent ? 1 : 0) + acc,
      0
    );
    qtyDelivered = orders.reduce(
      (acc, order) => (order.isDelivered ? 1 : 0) + acc,
      0
    );

    statistics = {
      totalPrice,
      totalPaid,
      totalNotPaid,
      qtyPaid,
      qtyNotPaid,
      totalTax,
      taxPaid,
      taxNotPaid,
      totalShipping,
      shippingPaid,
      shippingNotPaid,
      qtyStandard,
      qtyFree,
      qtyFastest,
      qtySent,
      qtyNotSent,
      qtyDelivered,
    };
  }

  res.json({ orders, statistics });
});

//Desc:Get order By Id
//Route: GET/api/orders/:id
//Access: Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName username"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Create new order
//Route: POST/api/orders
//Access: Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    _id,
    name,
    delivery,
    address,
    city,
    postalCode,
    country,
    method,
    account,
    prime,
    franchise,
  } = req.body;

  const user = await User.findById(req.body._id);
  var cartItems = [];
  if (user) {
    for (const index in user.cart) {
      const item = user.cart[index];
      if (+item.quantity > 0) {
        cartItems.push(item);
      }
    }
  }

  if (cartItems && cartItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems: cartItems,
      user: req.body._id,
      shippingAddress: {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
      },
      payment: {
        method: req.body.method,
        account: req.body.account,
      },
    });

    order.itemsPrice = order.orderItems
      .reduce(
        (acc, item) =>
          acc +
          +item.quantity * +item.price -
          +item.quantity * +item.price * +item.discount +
          +item.quantity * +item.price * +item.warranty +
          +item.gift,
        0
      )
      .toFixed(2);

    order.primePrice = req.body.prime === "Yes" ? 70 : 0;

    order.franchisePrice = req.body.franchise === "Yes" ? 500 : 0;

    order.shippingPrice =
      +req.body.delivery === 10
        ? 10
        : +order.itemsPrice > 800 || order.primePrice > 0
        ? 0
        : 5;

    order.taxPrice = (
      (+order.itemsPrice +
        +order.shippingPrice +
        +order.primePrice +
        +order.franchisePrice) *
      0.15
    ).toFixed(2);

    order.totalPrice = (
      +order.itemsPrice +
      +order.taxPrice +
      +order.primePrice +
      +order.franchisePrice +
      +order.shippingPrice
    ).toFixed(2);

    for (const index in user.cart) {
      const item = user.cart[index];
      item.quantity = 0;
      item.discount = 0;
      item.warranty = 0;
      item.gift = 0;
    }
    user.qtyItems = 0;
    user.subtotal = 0;
    await user.save();

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//Desc:Update order to paid
//Route: PUT/api/order/:id/paid
//Access: Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update order to sent
//Route: PUT/api/orders/:id/sent
//Access: Private
const updateOrderToSent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isSent = true;
    order.sentAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update invoice to sent
//Route: PUT/api/orders/:id/invoice
//Access: Private
const updateInvoiceToSent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.invoiceSent = true;
    order.invoiceAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update order to delivered
//Route: PUT/api/orders/:id/deliver
//Access: Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getMyOrders,
  getAdminOrders,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToSent,
  updateOrderToDelivered,
  updateInvoiceToSent,
};
