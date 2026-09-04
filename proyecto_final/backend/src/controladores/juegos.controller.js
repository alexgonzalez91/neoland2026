import { pool } from "../data/db.js";

export async function getJuegos(req, res) {
  try {
    const {
      buscar,
      genero,
      plataforma,
      orden,
      page = "1",
      limit = "12",
    } = req.query;

    const pageNumero = Number(page);
    const limitNumero = Number(limit);

    if (!Number.isInteger(pageNumero) || pageNumero <= 0) {
      return res.status(400).json({
        ok: false,
        message: "page debe ser un número entero positivo",
      });
    }

    if (
      !Number.isInteger(limitNumero) ||
      limitNumero <= 0 ||
      limitNumero > 50
    ) {
      return res.status(400).json({
        ok: false,
        message: "limit debe ser un número entero entre 1 y 50",
      });
    }

    const condiciones = [];
    const valores = [];

    if (buscar) {
      condiciones.push("juegos.titulo LIKE ?");
      valores.push(`%${buscar.trim()}%`);
    }

    if (genero) {
      condiciones.push("generos.nombre = ?");
      valores.push(genero.trim());
    }

    if (plataforma) {
      condiciones.push(`
        EXISTS (
          SELECT 1
          FROM juego_plataforma
          JOIN plataformas
            ON juego_plataforma.plataforma_id = plataformas.id
          WHERE juego_plataforma.juego_id = juegos.id
            AND plataformas.nombre = ?
        )
      `);

      valores.push(plataforma.trim());
    }

    const whereSql =
      condiciones.length > 0
        ? ` WHERE ${condiciones.join(" AND ")}`
        : "";

    const ordenesPermitidos = {
      titulo_asc: "juegos.titulo ASC",
      titulo_desc: "juegos.titulo DESC",
      puntuacion_asc: "juegos.puntuacion ASC",
      puntuacion_desc: "juegos.puntuacion DESC",
      fecha_asc: "juegos.fecha_lanzamiento ASC",
      fecha_desc: "juegos.fecha_lanzamiento DESC",
    };

    const ordenSql =
      ordenesPermitidos[orden] || ordenesPermitidos.titulo_asc;

    const [conteo] = await pool.query(
      `
        SELECT COUNT(*) AS total
        FROM juegos
        JOIN generos
          ON juegos.genero_id = generos.id
        ${whereSql}
      `,
      valores
    );

    const total = conteo[0].total;
    const totalPages = Math.ceil(total / limitNumero);
    const offset = (pageNumero - 1) * limitNumero;

    const sql = `
      SELECT
        juegos.id,
        juegos.titulo,
        juegos.descripcion,
        juegos.imagen,
        juegos.fecha_lanzamiento,
        juegos.puntuacion,
        generos.nombre AS genero
      FROM juegos
      JOIN generos
        ON juegos.genero_id = generos.id
      ${whereSql}
      ORDER BY ${ordenSql}
      LIMIT ?
      OFFSET ?
    `;

    const valoresFinales = [
      ...valores,
      limitNumero,
      offset,
    ];

    const [juegos] = await pool.query(sql, valoresFinales);

    return res.status(200).json({
      ok: true,
      data: juegos,
      pagination: {
        page: pageNumero,
        limit: limitNumero,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener los juegos",
    });
  }
}

export async function getJuegoById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero positivo",
      });
    }

    const [juegos] = await pool.query(
      `
        SELECT
          juegos.id,
          juegos.titulo,
          juegos.descripcion,
          juegos.imagen,
          juegos.fecha_lanzamiento,
          juegos.puntuacion,
          generos.nombre AS genero
        FROM juegos
        JOIN generos
          ON juegos.genero_id = generos.id
        WHERE juegos.id = ?
      `,
      [id]
    );

    if (juegos.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Juego no encontrado",
      });
    }

    const [plataformas] = await pool.query(
      `
        SELECT plataformas.nombre
        FROM juego_plataforma
        JOIN plataformas
          ON juego_plataforma.plataforma_id = plataformas.id
        WHERE juego_plataforma.juego_id = ?
        ORDER BY plataformas.nombre
      `,
      [id]
    );

    const [resenas] = await pool.query(
      `
        SELECT
          puntuacion,
          comentario,
          etiqueta
        FROM resenas_editoriales
        WHERE juego_id = ?
      `,
      [id]
    );

    const juego = {
      ...juegos[0],
      plataformas: plataformas.map((plataforma) => plataforma.nombre),
      resena: resenas[0] || null,
    };

    return res.status(200).json({
      ok: true,
      data: juego,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener el juego",
    });
  }
}

export async function createJuego(req, res) {
  try {
    const {
      titulo,
      descripcion,
      imagen,
      fecha_lanzamiento,
      puntuacion,
      genero_id,
    } = req.body;

    if (!titulo || !descripcion || !genero_id) {
      return res.status(400).json({
        ok: false,
        message: "Título, descripción y género son obligatorios",
      });
    }

    const generoId = Number(genero_id);

    if (!Number.isInteger(generoId) || generoId <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El género debe tener un ID válido",
      });
    }

    if (
      puntuacion !== undefined &&
      puntuacion !== null &&
      (Number(puntuacion) < 0 || Number(puntuacion) > 10)
    ) {
      return res.status(400).json({
        ok: false,
        message: "La puntuación debe estar entre 0 y 10",
      });
    }

    const [generos] = await pool.query(
      "SELECT id FROM generos WHERE id = ?",
      [generoId]
    );

    if (generos.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "El género indicado no existe",
      });
    }

    const [resultado] = await pool.query(
      `
        INSERT INTO juegos (
          titulo,
          descripcion,
          imagen,
          fecha_lanzamiento,
          puntuacion,
          genero_id
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        titulo,
        descripcion,
        imagen || null,
        fecha_lanzamiento || null,
        puntuacion ?? null,
        generoId,
      ]
    );

    return res.status(201).json({
      ok: true,
      message: "Juego creado correctamente",
      data: {
        id: resultado.insertId,
        titulo,
        descripcion,
        imagen: imagen || null,
        fecha_lanzamiento: fecha_lanzamiento || null,
        puntuacion: puntuacion ?? null,
        genero_id: generoId,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Error al crear el juego",
    });
  }
}

export async function updateJuego(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero positivo",
      });
    }

    const [juegosExistentes] = await pool.query(
      "SELECT id FROM juegos WHERE id = ?",
      [id]
    );

    if (juegosExistentes.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Juego no encontrado",
      });
    }

    const {
      titulo,
      descripcion,
      imagen,
      fecha_lanzamiento,
      puntuacion,
      genero_id,
    } = req.body;

    const campos = [];
    const valores = [];

    if (titulo !== undefined) {
      if (typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({
          ok: false,
          message: "El título no puede estar vacío",
        });
      }

      campos.push("titulo = ?");
      valores.push(titulo.trim());
    }

    if (descripcion !== undefined) {
      if (typeof descripcion !== "string" || descripcion.trim() === "") {
        return res.status(400).json({
          ok: false,
          message: "La descripción no puede estar vacía",
        });
      }

      campos.push("descripcion = ?");
      valores.push(descripcion.trim());
    }

    if (imagen !== undefined) {
      campos.push("imagen = ?");
      valores.push(imagen || null);
    }

    if (fecha_lanzamiento !== undefined) {
      campos.push("fecha_lanzamiento = ?");
      valores.push(fecha_lanzamiento || null);
    }

    if (puntuacion !== undefined) {
      const puntuacionNumero =
        puntuacion === null ? null : Number(puntuacion);

      if (
        puntuacionNumero !== null &&
        (!Number.isFinite(puntuacionNumero) ||
          puntuacionNumero < 0 ||
          puntuacionNumero > 10)
      ) {
        return res.status(400).json({
          ok: false,
          message: "La puntuación debe estar entre 0 y 10",
        });
      }

      campos.push("puntuacion = ?");
      valores.push(puntuacionNumero);
    }

    if (genero_id !== undefined) {
      const generoId = Number(genero_id);

      if (!Number.isInteger(generoId) || generoId <= 0) {
        return res.status(400).json({
          ok: false,
          message: "El género debe tener un ID válido",
        });
      }

      const [generos] = await pool.query(
        "SELECT id FROM generos WHERE id = ?",
        [generoId]
      );

      if (generos.length === 0) {
        return res.status(400).json({
          ok: false,
          message: "El género indicado no existe",
        });
      }

      campos.push("genero_id = ?");
      valores.push(generoId);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No se han enviado campos válidos para actualizar",
      });
    }

    valores.push(id);

    await pool.query(
      `UPDATE juegos SET ${campos.join(", ")} WHERE id = ?`,
      valores
    );

    const [juegosActualizados] = await pool.query(
      `
        SELECT
          juegos.id,
          juegos.titulo,
          juegos.descripcion,
          juegos.imagen,
          juegos.fecha_lanzamiento,
          juegos.puntuacion,
          generos.nombre AS genero
        FROM juegos
        JOIN generos
          ON juegos.genero_id = generos.id
        WHERE juegos.id = ?
      `,
      [id]
    );

    return res.status(200).json({
      ok: true,
      message: "Juego actualizado correctamente",
      data: juegosActualizados[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el juego",
    });
  }
}

export async function deleteJuego(req, res) {
  const connection = await pool.getConnection();

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero positivo",
      });
    }

    const [juegos] = await connection.query(
      "SELECT id FROM juegos WHERE id = ?",
      [id]
    );

    if (juegos.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Juego no encontrado",
      });
    }

    await connection.beginTransaction();

    await connection.query(
      "DELETE FROM juego_plataforma WHERE juego_id = ?",
      [id]
    );

    await connection.query(
      "DELETE FROM resenas_editoriales WHERE juego_id = ?",
      [id]
    );

    await connection.query(
      "DELETE FROM juegos WHERE id = ?",
      [id]
    );

    await connection.commit();

    return res.status(200).json({
      ok: true,
      message: "Juego eliminado correctamente",
    });
  } catch (error) {
    await connection.rollback();

    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Error al eliminar el juego",
    });
  } finally {
    connection.release();
  }
}