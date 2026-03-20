import express from "express";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Select Charity
router.post("/charity", auth, async (req, res) => {
  try {
    const { charityId } = req.body;

    console.log("Selected charity:", charityId);

    await User.findByIdAndUpdate(req.user, {
      charity: charityId   // ✅ IMPORTANT CHANGE
    });

    res.json({ msg: "Charity selected successfully" });

  } catch (err) {
    console.log("CHARITY ERROR:", err);
    res.status(500).json({ msg: "Error selecting charity" });
  }
});

router.post("/subscribe", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user, {
      "subscription.isActive": true,
      "subscription.plan": "Premium",
      "subscription.expiryDate": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    res.json({ msg: "Subscription activated" });

  } catch (err) {
    console.log("SUBSCRIBE ERROR:", err);
    res.status(500).json({ msg: "Error subscribing" });
  }
});

export default router;