import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  score: Number,
  date: Date
});

// 👇 IMPORTANT (explicit model creation)
const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;