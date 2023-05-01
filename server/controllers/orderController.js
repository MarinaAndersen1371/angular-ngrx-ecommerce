import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Mail from "../models/mailModel.js";
import Product from "../models/productModel.js";

//Desc: Fetch all  orders
//Route: GET/api/orders
//Access: Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "user",
    "_id firstName username"
  );

  var statistics,
    qtyPaid,
    qtyNotPaid,
    costNotPaid,
    costPaid,
    totalItemsPaid,
    totalItemsNotPaid,
    totalPricePaid,
    totalPriceNotPaid,
    taxPaid,
    taxNotPaid,
    shippingPaid,
    shippingNotPaid,
    qtyStandard,
    qtyFree,
    qtyFastest,
    qtySent,
    qtyNotSent,
    qtyDelivered,
    totalItemsReturn,
    totalReturnNotPaid,
    totalReturnPaid,
    totalShippingReturn,
    totalTaxReturnNotPaid,
    totalTaxReturnPaid,
    qtyReturn,
    qtyReturnReceived,
    qtyReturnActive,
    qtyReturnClosed,
    qtyGift,
    totalGiftPrice,
    qtyExtra,
    totalExtraPrice,
    qtyExtraActive,
    qtyExtraNotActive,
    qtyVoucher;

  if (orders) {
    costPaid = orders
      .reduce((acc, order) => (order.isPaid ? +order.totalCost : 0) + acc, 0)
      .toFixed(2);
    costNotPaid = orders
      .reduce((acc, order) => (!order.isPaid ? +order.totalCost : 0) + acc, 0)
      .toFixed(2);

    totalItemsPaid = orders
      .reduce((acc, order) => (order.isPaid ? +order.itemsPrice : 0) + acc, 0)
      .toFixed(2);
    totalItemsNotPaid = orders
      .reduce((acc, order) => (!order.isPaid ? +order.itemsPrice : 0) + acc, 0)
      .toFixed(2);

    totalPricePaid = orders
      .reduce((acc, order) => (order.isPaid ? +order.totalPrice : 0) + acc, 0)
      .toFixed(2);
    totalPriceNotPaid = orders
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

    totalReturnNotPaid = orders
      .reduce(
        (acc, order) => (!order.isPaid ? +order.totalPriceReturn : 0) + acc,
        0
      )
      .toFixed(2);
    totalReturnPaid = orders
      .reduce(
        (acc, order) => (order.isPaid ? +order.totalPriceReturn : 0) + acc,
        0
      )
      .toFixed(2);
    totalItemsReturn = orders
      .reduce((acc, order) => acc + +order.itemsPriceReturn, 0)
      .toFixed(2);
    totalShippingReturn = orders
      .reduce((acc, order) => acc + +order.shippingPriceReturn, 0)
      .toFixed(2);
    totalTaxReturnNotPaid = orders
      .reduce(
        (acc, order) => (!order.isPaid ? +order.taxPriceReturn : 0) + acc,
        0
      )
      .toFixed(2);
    totalTaxReturnPaid = orders
      .reduce(
        (acc, order) => (order.isPaid ? +order.taxPriceReturn : 0) + acc,
        0
      )
      .toFixed(2);
    qtyReturn = orders.reduce(
      (acc, order) => (order.returnActive ? 1 : 0) + acc,
      0
    );
    qtyReturnReceived = orders.reduce(
      (acc, order) => (order.returnReceived ? 1 : 0) + acc,
      0
    );
    qtyReturnActive = orders.reduce(
      (acc, order) => (order.returnActive && !order.returnClosed ? 1 : 0) + acc,
      0
    );
    qtyReturnClosed = orders.reduce(
      (acc, order) => (order.returnActive && order.returnClosed ? 1 : 0) + acc,
      0
    );

    qtyGift = orders.reduce(
      (acc, order) => (+order.giftPrice > 0 ? 1 : 0) + acc,
      0
    );
    totalGiftPrice = orders.reduce((acc, order) => +order.giftPrice + acc, 0);

    qtyExtra = orders.reduce(
      (acc, order) => (+order.extraPrice > 0 ? 1 : 0) + acc,
      0
    );
    totalExtraPrice = orders.reduce((acc, order) => +order.extraPrice + acc, 0);
    qtyExtraActive = orders.reduce(
      (acc, order) => (order.isExtra ? 1 : 0) + acc,
      0
    );
    qtyExtraNotActive = orders.reduce(
      (acc, order) => (+order.extraPrice > 0 && !order.isExtra ? 1 : 0) + acc,
      0
    );
    qtyVoucher = orders.reduce(
      (acc, order) => (order.voucher.trim() !== "" ? 1 : 0) + acc,
      0
    );

    statistics = {
      qtyPaid,
      qtyNotPaid,
      costNotPaid,
      costPaid,
      totalItemsPaid,
      totalItemsNotPaid,
      totalPricePaid,
      totalPriceNotPaid,
      taxPaid,
      taxNotPaid,
      shippingPaid,
      shippingNotPaid,
      qtyStandard,
      qtyFree,
      qtyFastest,
      qtySent,
      qtyNotSent,
      qtyDelivered,
      totalItemsReturn,
      totalReturnNotPaid,
      totalReturnPaid,
      totalShippingReturn,
      totalTaxReturnNotPaid,
      totalTaxReturnPaid,
      qtyReturn,
      qtyReturnReceived,
      qtyReturnActive,
      qtyReturnClosed,
      qtyGift,
      totalGiftPrice,
      qtyExtra,
      totalExtraPrice,
      qtyExtraActive,
      qtyExtraNotActive,
      qtyVoucher,
    };
    res.json({ orders, statistics });
  }
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
    address,
    city,
    postalCode,
    country,
    delivery,
    nameInvoice,
    addressInvoice,
    cityInvoice,
    postalCodeInvoice,
    countryInvoice,
    method,
    account,
    prime,
    franchise,
  } = req.body;

  const user = await User.findById(req.body._id);
  var cartItems = [];

  if (user && !user.deleted && user.cart.length > 0) {
    for (const index in user.cart) {
      const item = user.cart[index];
      cartItems.push(item);
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
        invoiceAddress: {
          name: req.body.nameInvoice,
          address: req.body.addressInvoice,
          city: req.body.cityInvoice,
          postalCode: req.body.postalCodeInvoice,
          country: req.body.countryInvoice,
        },
        payment: {
          method: req.body.method,
          account: req.body.account,
        },
      });

      if (order && order.orderItems) {
        for (const index in order.orderItems) {
          const item = order.orderItems[index];
          const product = await Product.findById(item._id);
          if (product) {
            product.quantity -= +item.quantity;
            if (+product.quantity < 0) {
              throw new Error("One of the Items is out of stock");
              return;
            } else {
              await product.save();
            }
          }
        }

        order.itemsCost = order.orderItems
          .reduce((acc, item) => acc + +item.quantity * +item.pricePurchase, 0)
          .toFixed(2);

        order.itemsPrice = order.orderItems
          .reduce(
            (acc, item) =>
              acc +
              +item.quantity * +item.price -
              +item.quantity * +item.price * +item.discount +
              +item.quantity * +item.price * +item.warranty +
              +item.quantity * (+item.extra1 + +item.extra2) +
              +item.gift,
            0
          )
          .toFixed(2);

        order.extraPrice = order.orderItems
          .reduce(
            (acc, item) =>
              acc +
              +item.quantity * +item.extra1 +
              +item.quantity * +item.extra2,
            0
          )
          .toFixed(2);

        order.giftPrice = order.orderItems
          .reduce((acc, item) => acc + +item.gift, 0)
          .toFixed(2);

        order.primePrice = req.body.prime === "Yes" && !user.isPrime ? 70 : 0;

        order.franchisePrice =
          req.body.franchise === "Yes" && !user.testPaid ? 500 : 0;

        order.shippingPrice =
          +req.body.delivery === 10
            ? 10
            : +order.itemsPrice > 800 || +order.primePrice > 0 || user.isPrime
            ? 0
            : 5;

        order.taxPrice = (
          (+order.itemsPrice +
            +order.shippingPrice +
            +order.primePrice +
            +order.franchisePrice) *
          0.15
        ).toFixed(2);

        //Cost: gift= 10%, prime=10%, franchise=30%
        order.totalCost = (
          +order.itemsCost +
          +order.giftPrice * 0.1 +
          +order.primePrice * 0.1 +
          +order.franchisePrice * 0.3
        ).toFixed(2);

        order.totalPrice = (
          +order.itemsPrice +
          +order.taxPrice +
          +order.primePrice +
          +order.franchisePrice +
          +order.shippingPrice
        ).toFixed(2);
      }

      user.cart = [];
      user.subtotal = 0;
      await user.save();

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
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

    const user = await User.findById(order.user._id);
    const userManager = await User.findOne({ email: "manager@web.de" });

    if (user && !user.deleted && userManager && +order.primePrice === 70) {
      user.isPrime = true;
      user.primeFrom = Date.now();
      await user.save();

      const mail = new Mail({
        user: userManager._id,
        mailTarget: user.email,
        firstNameTarget: user.firstName,
        lastNameTarget: user.username,
        subject: `Your Premium Membership, ${user.firstName}!`,
        message: `Hello, ${user.firstName}!
      Thank you for the subscription! Your Premium Membership has started from ${user.primeFrom}`,
      });
      await mail.save();
    }

    if (user && !user.deleted && userManager && +order.franchisePrice === 500) {
      user.testPaid = true;
      await user.save();

      const mail = new Mail({
        user: userManager._id,
        mailTarget: user.email,
        firstNameTarget: user.firstName,
        lastNameTarget: user.username,
        subject: `Your Franchise Association Membership, ${user.firstName}!`,
        message: `Hello, ${user.firstName}! Thank you for the subscription!
      In order to become a Member of the Franchise Association you need to complete a training.`,
      });
      await mail.save();
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Submit customer voucher
//Route: PUT/api/order/:id/voucher
//Access: Private
const updateCustomerVoucher = asyncHandler(async (req, res) => {
  const { userId, voucher } = req.body;

  const voucherExists = await Order.findOne({
    voucher: req.body.voucher.trim(),
  });
  if (voucherExists) {
    res.status(400);
    throw new Error("This Voucher is already submitted!");
    return;
  }

  const order = await Order.findById(req.params.id);
  if (order && !order.returnActive) {
    order.voucher = req.body.voucher.trim();
    order.taxPrice = (
      (+order.itemsPrice +
        +order.shippingPrice +
        +order.primePrice +
        +order.franchisePrice -
        10) *
      0.15
    ).toFixed(2);

    order.totalPrice = (
      +order.itemsPrice +
      +order.taxPrice +
      +order.primePrice +
      +order.franchisePrice +
      +order.shippingPrice -
      10
    ).toFixed(2);
    const updatedOrder = await order.save();

    const user = await User.findById(req.body.userId);
    if (user && !user.deleted) {
      user.coupon = " ";
      await user.save();
    }

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
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName username email"
  );
  const userManager = await User.findOne({ email: "manager@web.de" });

  if (
    order &&
    order.user &&
    order.isPaid &&
    !order.returnActive &&
    userManager
  ) {
    order.isSent = true;
    order.sentAt = Date.now();
    const updatedOrder = await order.save();

    const mail = new Mail({
      user: userManager._id,
      mailTarget: order.user.email,
      firstNameTarget: order.user.firstName,
      lastNameTarget: order.user.username,
      subject: "Your Order has been sent!",
      message: `Hello, ${order.user.firstName}!
      Your Order ${order._id} has been sent on ${order.sentAt}`,
    });
    await mail.save();

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
  if (order && order.isPaid && !order.returnActive) {
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
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName username email"
  );
  const userManager = await User.findOne({ email: "manager@web.de" });

  if (
    order &&
    order.user &&
    order.isSent &&
    !order.returnActive &&
    userManager
  ) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    if (+order.extraPrice > 0) {
      order.isExtra = true;
    }
    const updatedOrder = await order.save();

    const mail = new Mail({
      user: userManager._id,
      mailTarget: order.user.email,
      firstNameTarget: order.user.firstName,
      lastNameTarget: order.user.username,
      subject: "Your Order has been delivered!",
      message: `Hello, ${order.user.firstName}!
      Your Order ${order._id} has been delivered on ${order.deliveredAt}`,
    });
    await mail.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Return to active
//Route: PUT/api/orders/:id/returnactive
//Access: Private
const updateReturnToActive = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order && order.orderItems) {
    order.returnActive = true;
    order.isExtra = false;
    order.itemsPriceReturn = order.orderItems
      .reduce(
        (acc, item) =>
          acc +
          (+item.quantity * +item.price -
            +item.quantity * +item.price * +item.discount +
            +item.quantity * +item.price * +item.warranty +
            +item.quantity * (+item.extra1 + +item.extra2)),
        0
      )
      .toFixed(2);
    order.itemsCostReturn = order.orderItems
      .reduce((acc, item) => acc + +item.quantity * +item.pricePurchase, 0)
      .toFixed(2);
    order.shippingPriceReturn = order.isSent ? 0 : order.shippingPrice;
    order.taxPriceReturn = (
      (+order.itemsPriceReturn +
        +order.shippingPriceReturn -
        (order.voucher.trim() !== "" ? 10 : 0)) *
      0.15
    ).toFixed(2);
    order.totalPriceReturn = (
      +order.itemsPriceReturn +
      +order.taxPriceReturn +
      +order.shippingPriceReturn -
      (order.voucher.trim() !== "" ? 10 : 0)
    ).toFixed(2);

    order.totalCost = (+order.totalCost - +order.itemsCostReturn).toFixed(2);

    for (const index in order.orderItems) {
      const item = order.orderItems[index];
      const product = await Product.findById(item._id);
      if (product && !product.deleted) {
        product.quantity += +item.quantity;
        await product.save();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update return to received
//Route: PUT/api/orders/:id/returnreceived
//Access: Private / Manager
const updateReturnToReceived = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order && order.isSent && order.returnActive) {
    order.returnReceived = true;
    order.returnReceivedAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update refund to paid
//Route: PUT/api/orders/:id/refund
//Access: Private / Manager
const updateRefundToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order && order.isPaid && order.returnActive) {
    order.refund = true;
    order.refundAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc:Update return to closed
//Route: PUT/api/orders/:id/returnclosed
//Access: Private / Manager
const updateReturnToClosed = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order && order.returnActive) {
    order.returnClosed = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getOrders,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToSent,
  updateOrderToDelivered,
  updateInvoiceToSent,
  updateCustomerVoucher,
  updateReturnToActive,
  updateReturnToReceived,
  updateRefundToPaid,
  updateReturnToClosed,
};
