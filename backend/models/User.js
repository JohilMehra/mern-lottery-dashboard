import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  subscription: {
    plan: String,
    isActive: { type: Boolean, default: false },
    expiryDate: Date
  },

  charity: {
    type: String
  },

  donationPercent: { type: Number, default: 10 }
});

export default mongoose.model("User", userSchema);