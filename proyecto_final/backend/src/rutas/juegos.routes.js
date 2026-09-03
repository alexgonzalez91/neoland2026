import { Router } from "express";
import {
  getJuegos,
  getJuegoById,
  createJuego,
  updateJuego,
  deleteJuego,
} from "../controladores/juegos.controller.js";

const router = Router();

router.get("/", getJuegos);
router.get("/:id", getJuegoById);
router.post("/", createJuego);
router.patch("/:id", updateJuego);
router.delete("/:id", deleteJuego);

export default router;