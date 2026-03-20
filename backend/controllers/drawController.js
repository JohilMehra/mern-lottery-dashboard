import Draw from "../models/Draw.js";
import Score from "../models/Score.js";

export const runDraw = async (req, res) => {
  const numbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 45) + 1
  );

  const draw = await Draw.create({ numbers, date: new Date() });

  const scores = await Score.find();

  let winners = [];

  const userScoresMap = {};

  scores.forEach(s => {
    if (!userScoresMap[s.userId]) userScoresMap[s.userId] = [];
    userScoresMap[s.userId].push(s.score);
  });

  for (let userId in userScoresMap) {
    const userScores = userScoresMap[userId];

    let matchCount = userScores.filter(score =>
      numbers.includes(score)
    ).length;

    if (matchCount >= 3) {
      winners.push({ userId, matchCount });
    }
  }

  res.json({ draw, winners });
};