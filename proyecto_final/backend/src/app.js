import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import juegosRoutes from "./rutas/juegos.routes.js";
import generosRoutes from "./rutas/generos.routes.js";
import plataformasRoutes from "./rutas/plataformas.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:4321",
    })
);

app.use(express.json());
app.use("/api/juegos", juegosRoutes);
app.use("/api/generos", generosRoutes);
app.use("/api/plataformas", plataformasRoutes);

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "MatchGame API funcionando",
  });
});

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`);
});