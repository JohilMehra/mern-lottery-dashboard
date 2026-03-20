import express from "express";
import { addScore } from "../controllers/scoreController.js";
import { auth } from "../middleware/auth.js";
import Score from "../models/Score.js"; // 🔥 IMPORTANT

const router = express.Router();

// add score
router.post("/add", auth, addScore);

// get user scores
router.get("/my", auth, async (req, res) => {
  try {
    console.log("USER ID:", req.user); // 🔍 debug

    const scores = await Score.find({ userId: req.user }).sort({ date: -1 });

    res.json(scores);

  } catch (err) {
    console.log("SCORE FETCH ERROR:", err);
    res.status(500).json({ msg: "Error fetching scores" });
  }
});

export default router;