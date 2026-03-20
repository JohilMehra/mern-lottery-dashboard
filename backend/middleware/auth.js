import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "secret");

    req.user = decoded.id; // 🔥 IMPORTANT

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};