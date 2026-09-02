import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:4321",
    })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "MatchGame API funcionando",
  });
});

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`);
});