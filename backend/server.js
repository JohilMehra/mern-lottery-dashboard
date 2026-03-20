import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// routes
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes connect
app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/user", userRoutes);
app.use("/api/draw", drawRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("API running"));

app.listen(5000, () => console.log("Server running"));