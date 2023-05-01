import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, required: true },
    test: {
      test1: { type: String, required: true, default: " " },
      test2: { type: String, required: true, default: " " },
      test3: { type: String, required: true, default: " " },
      test4: { type: String, required: true, default: " " },
      test5: { type: String, required: true, default: " " },
    },
    testPaid: { type: Boolean, required: true, default: false },
    testScore: { type: Number, required: true, default: 0 },
    isPrime: { type: Boolean, required: true, default: false },
    primeFrom: { type: Date },
    isFranchise: { type: Boolean, required: true, default: false },
    franchiseFrom: { type: Date },
    coupon: { type: String, required: true, default: " " },
    isManager: { type: Boolean, required: true, default: false },
    isadmin: { type: Boolean, required: true, default: false },
    lastLogin: { type: Date },
    lastModified: { type: Date },
    modifiedBy: { type: String, required: true, default: " " },
    cart: [
      {
        id: { type: String },
        name: { type: String },
        imageUrl: { type: String },
        description: { type: String },
        pricePurchase: { type: Number },
        price: { type: Number },
        quantity: { type: Number },
        gift: { type: Number },
        warranty: { type: Number },
        discount: { type: Number },
        extra1: { type: Number },
        extra2: { type: Number },
      },
    ],
    subtotal: { type: Number, default: 0.0 },
    deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
