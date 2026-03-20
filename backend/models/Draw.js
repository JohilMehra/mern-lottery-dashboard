import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  numbers: [Number],
  date: Date
});

export default mongoose.model("Draw", drawSchema);