import Score from "../models/Score.js";

export const addScore = async (req, res) => {
  const { score } = req.body;

  let scores = await Score.find({ userId: req.user }).sort({ date: 1 });

  if (scores.length >= 5) {
    await Score.findByIdAndDelete(scores[0]._id); // remove oldest
  }

  const newScore = await Score.create({
    userId: req.user,
    score,
    date: new Date()
  });

  res.json(newScore);
};