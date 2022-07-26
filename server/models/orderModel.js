import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        warranty: { type: Number, required: true },
        gift: { type: Number, required: true },
        discount: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      method: { type: String, required: true },
      account: { type: String, required: true },
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    primePrice: { type: Number, required: true, default: 0.0 },
    franchisePrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isSent: { type: Boolean, required: true, default: false },
    sentAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    invoiceSent: { type: Boolean, required: true, default: false },
    invoiceAt: { type: Date },
    voucher: { type: String, required: true, default: " " },
    voucherActive: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
