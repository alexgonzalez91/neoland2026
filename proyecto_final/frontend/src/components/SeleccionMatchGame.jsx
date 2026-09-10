import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:3000";

export default function SeleccionMatchGame() {
  const [resenas, setResenas] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);

  const [etiqueta, setEtiqueta] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarEtiquetas() {
      try {
        const response = await fetch(
          `${API_URL}/api/etiquetas`
        );

        if (!response.ok) {
          throw new Error(
            "No se pudieron cargar las etiquetas"
          );
        }

        const resultado =
          await response.json();

        setEtiquetas(resultado.data);
      } catch (error) {
        setError(error.message);
      }
    }

    cargarEtiquetas();
  }, []);

  useEffect(() => {
    async function cargarResenas() {
      try {
        setLoading(true);
        setError("");

        const params =
          new URLSearchParams();

        if (etiqueta) {
          params.set(
            "etiqueta",
            etiqueta
          );
        }

        const query =
          params.toString();

        const url = query
          ? `${API_URL}/api/resenas?${query}`
          : `${API_URL}/api/resenas`;

        const response =
          await fetch(url);

        if (!response.ok) {
          throw new Error(
            "No se pudo cargar la selección editorial"
          );
        }

        const resultado =
          await response.json();

        setResenas(resultado.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    cargarResenas();
  }, [etiqueta]);

  function handleEtiquetaChange(event) {
    setEtiqueta(event.target.value);
  }

  function handleLimpiarFiltro() {
    setEtiqueta("");
  }

  return (
    <>
      <div className="selection-filter">
        <div className="filter-control">
          <label htmlFor="etiqueta">
            Filtrar por etiqueta
          </label>

          <select
            id="etiqueta"
            value={etiqueta}
            onChange={handleEtiquetaChange}
          >
            <option value="">
              Todas las etiquetas
            </option>

            {etiquetas.map((etiqueta) => (
              <option
                key={etiqueta}
                value={etiqueta}
              >
                {etiqueta}
              </option>
            ))}
          </select>
        </div>

        {etiqueta && (
          <button
            type="button"
            className="clear-filter"
            onClick={handleLimpiarFiltro}
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {loading && (
        <p className="selection-status">
          Cargando recomendaciones...
        </p>
      )}

      {!loading && error && (
        <p className="selection-status selection-status--error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        resenas.length === 0 && (
          <p className="selection-status">
            No hay recomendaciones para esta etiqueta.
          </p>
        )}

      {!loading &&
        !error &&
        resenas.length > 0 && (
          <div className="reviews-grid">
            {resenas.map((resena) => (
              <article
                className="review-card"
                key={resena.id}
              >
                <div className="review-card__top">
                  <div>
                    <p className="review-card__tag">
                      {resena.etiqueta}
                    </p>

                    <h2>
                      {resena.titulo}
                    </h2>
                  </div>

                  <span className="review-card__score">
                    {Number(
                      resena.puntuacion
                    ).toFixed(1)}
                  </span>
                </div>

                <p className="review-card__comment">
                  {resena.comentario}
                </p>

                <a
                  className="review-card__link"
                  href={`/juegos/${resena.juego_id}`}
                >
                  Ver videojuego →
                </a>
              </article>
            ))}
          </div>
        )}

      <style>{`
        .selection-filter {
          display: flex;
          align-items: end;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .filter-control {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .filter-control label {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .filter-control select {
          min-width: 240px;
          padding: 10px 12px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-small);
          background-color: var(--color-bg-secondary);
          color: var(--color-text-primary);
        }

        .clear-filter {
          padding: 10px 16px;
          border: 1px solid var(--color-primary);
          border-radius: var(--radius-small);
          background-color: transparent;
          color: var(--color-text-primary);
          font-weight: 600;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: var(--space-3);
        }

        .review-card {
          padding: var(--space-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          background-color: var(--color-card);
          transition:
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .review-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary);
        }

        .review-card__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
        }

        .review-card__tag {
          margin-bottom: 4px;
          color: var(--color-primary-secondary);
          font-size: 0.875rem;
          font-weight: 700;
        }

        .review-card h2 {
          font-size: 1.25rem;
        }

        .review-card__score {
          flex-shrink: 0;
          padding: 8px 10px;
          border-radius: var(--radius-small);
          background-color: var(--color-primary);
          color: var(--color-text-primary);
          font-weight: 700;
        }

        .review-card__comment {
          margin-bottom: var(--space-2);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        .review-card__link {
          color: var(--color-primary-secondary);
          font-weight: 600;
        }

        .selection-status {
          padding-block: var(--space-4);
          text-align: center;
        }

        .selection-status--error {
          color: var(--color-error);
        }

        @media (max-width: 768px) {
          .selection-filter {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-control select,
          .clear-filter {
            width: 100%;
          }

          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}