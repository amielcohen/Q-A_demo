// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo error:", err));

function sha512(password) {
  return crypto.createHash("sha512").update(password).digest("hex");
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, nickname, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// פעם אחת תיצור ידנית יוזר בבסיס הנתונים, או תוסיף route זמני לזה.

// POST /login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("=== /login called ===");
  console.log("BODY:", req.body);

  const user = await User.findOne({ email });
  console.log("FOUND USER:", user);

  if (!user) {
    console.log("NO USER WITH EMAIL:", email);
    return res.status(401).json({ message: "Invalid credentials (email)" });
  }

  const hashed = sha512(password);
  console.log("PASSWORD INPUT:", password);
  console.log("HASHED:", hashed);
  console.log("STORED:", user.password);
  console.log("EQUAL? ->", user.password === hashed);

  if (user.password !== hashed) {
    return res.status(401).json({ message: "Invalid credentials (password)" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      nickname: user.nickname,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("LOGIN SUCCESS for:", user.email);

  res.json({
    token,
    user: {
      nickname: user.nickname,
      fullName: user.fullName,
      email: user.email,
    },
  });
});

// GET /userInfo
app.get("/userInfo", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({
    nickname: user.nickname,
    fullName: user.fullName,
    email: user.email,
  });
});

// POST /createQuestion
app.post("/createQuestion", authMiddleware, async (req, res) => {
  const { title, body, tags } = req.body;

  const q = await Question.create({
    title,
    body,
    tags,
    userId: req.user.userId,
  });

  res.status(201).json(q);
});

// GET /getQuestions
app.get("/getQuestions", authMiddleware, async (req, res) => {
  const qs = await Question.find().sort({ createdAt: -1 });
  res.json(qs);
});

// GET /getQuestionAnswers?questionId=...
app.get("/getQuestionAnswers", authMiddleware, async (req, res) => {
  const { questionId } = req.query;
  const answers = await Answer.find({ questionId });
  res.json(answers);
});

// POST /answer
app.post("/answer", authMiddleware, async (req, res) => {
  const { questionId, body } = req.body;

  const a = await Answer.create({
    questionId,
    body,
    userId: req.user.userId,
  });

  res.status(201).json(a);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
