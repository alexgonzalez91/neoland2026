import { pool } from "../data/db.js";

export async function getPlataformas(req, res) {
  try {
    const [plataformas] = await pool.query(`
      SELECT
        id,
        nombre
      FROM plataformas
      ORDER BY nombre
    `);

    return res.status(200).json({
      ok: true,
      data: plataformas,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener las plataformas",
    });
  }
}