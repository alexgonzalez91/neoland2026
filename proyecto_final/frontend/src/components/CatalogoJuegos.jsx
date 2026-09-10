import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:3000";

export default function CatalogoJuegos() {
  const [juegos, setJuegos] = useState([]);

  const [generos, setGeneros] = useState([]);
  const [plataformas, setPlataformas] = useState([]);

  const [terminoInput, setTerminoInput] = useState("");
  const [buscar, setBuscar] = useState("");
  const [urlProcesada, setUrlProcesada] = useState(false);

  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [orden, setOrden] = useState("titulo_asc");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const busquedaURL =
      params.get("buscar") || "";

    setTerminoInput(busquedaURL);
    setBuscar(busquedaURL);

    setUrlProcesada(true);
  }, []);

  useEffect(() => {
    async function cargarOpcionesFiltros() {
      try {
        const [responseGeneros, responsePlataformas] =
          await Promise.all([
            fetch(`${API_URL}/api/generos`),
            fetch(`${API_URL}/api/plataformas`),
          ]);

        if (
          !responseGeneros.ok ||
          !responsePlataformas.ok
        ) {
          throw new Error(
            "No se pudieron cargar las opciones de filtrado"
          );
        }

        const resultadoGeneros =
          await responseGeneros.json();

        const resultadoPlataformas =
          await responsePlataformas.json();

        setGeneros(resultadoGeneros.data);
        setPlataformas(
          resultadoPlataformas.data
        );
      } catch (error) {
        setError(error.message);
      }
    }

    cargarOpcionesFiltros();
  }, []);

  useEffect(() => {
    if (!urlProcesada) {
      return;
    }

    async function cargarJuegos() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: String(page),
          limit: "12",
          orden,
        });

        if (buscar) {
          params.set("buscar", buscar);
        }

        if (genero) {
          params.set("genero", genero);
        }

        if (plataforma) {
          params.set(
            "plataforma",
            plataforma
          );
        }

        const response = await fetch(
          `${API_URL}/api/juegos?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            "No se pudo cargar el catálogo"
          );
        }

        const resultado =
          await response.json();

        setJuegos(resultado.data);

        setPagination(
          resultado.pagination
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    cargarJuegos();
  }, [
    buscar,
    genero,
    plataforma,
    orden,
    page,
    urlProcesada,
  ]);

  function handleBuscar(event) {
    event.preventDefault();

    setPage(1);
    setBuscar(terminoInput.trim());
  }

  function handleLimpiarBusqueda() {
    setTerminoInput("");
    setBuscar("");
    setPage(1);
  }

  function handleGeneroChange(event) {
    setGenero(event.target.value);
    setPage(1);
  }

  function handlePlataformaChange(event) {
    setPlataforma(event.target.value);
    setPage(1);
  }

  function handleOrdenChange(event) {
    setOrden(event.target.value);
    setPage(1);
  }

  function handleRestablecerFiltros() {
    setGenero("");
    setPlataforma("");
    setOrden("titulo_asc");
    setPage(1);
  }

  function handlePaginaAnterior() {
    setPage((paginaActual) =>
      Math.max(
        paginaActual - 1,
        1
      )
    );
  }

  function handlePaginaSiguiente() {
    setPage((paginaActual) =>
      Math.min(
        paginaActual + 1,
        pagination.totalPages
      )
    );
  }

  const hayFiltrosActivos =
    genero ||
    plataforma ||
    orden !== "titulo_asc";

  return (
    <>
      <div className="catalog-controls">
        <form
          className="search-form"
          onSubmit={handleBuscar}
        >
          <label
            className="sr-only"
            htmlFor="buscar-juego"
          >
            Buscar videojuego
          </label>

          <input
            id="buscar-juego"
            type="search"
            placeholder="Buscar por título..."
            value={terminoInput}
            onChange={(event) =>
              setTerminoInput(
                event.target.value
              )
            }
          />

          <button type="submit">
            Buscar
          </button>

          {buscar && (
            <button
              type="button"
              className="button-secondary"
              onClick={
                handleLimpiarBusqueda
              }
            >
              Limpiar
            </button>
          )}
        </form>

        <div className="filters">
          <div className="filter-control">
            <label htmlFor="genero">
              Género
            </label>

            <select
              id="genero"
              value={genero}
              onChange={
                handleGeneroChange
              }
            >
              <option value="">
                Todos los géneros
              </option>

              {generos.map((genero) => (
                <option
                  key={genero.id}
                  value={genero.nombre}
                >
                  {genero.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-control">
            <label htmlFor="plataforma">
              Plataforma
            </label>

            <select
              id="plataforma"
              value={plataforma}
              onChange={
                handlePlataformaChange
              }
            >
              <option value="">
                Todas las plataformas
              </option>

              {plataformas.map(
                (plataforma) => (
                  <option
                    key={plataforma.id}
                    value={
                      plataforma.nombre
                    }
                  >
                    {
                      plataforma.nombre
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <div className="filter-control">
            <label htmlFor="orden">
              Ordenar por
            </label>

            <select
              id="orden"
              value={orden}
              onChange={
                handleOrdenChange
              }
            >
              <option value="titulo_asc">
                Título A-Z
              </option>

              <option value="titulo_desc">
                Título Z-A
              </option>

              <option value="puntuacion_desc">
                Mejor puntuación
              </option>

              <option value="puntuacion_asc">
                Menor puntuación
              </option>

              <option value="fecha_desc">
                Más recientes
              </option>

              <option value="fecha_asc">
                Más antiguos
              </option>
            </select>
          </div>

          {hayFiltrosActivos && (
            <button
              type="button"
              className="reset-filters"
              onClick={
                handleRestablecerFiltros
              }
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {!loading && !error && (
        <p className="catalog-summary">
          {pagination.total} videojuegos encontrados
        </p>
      )}

      {loading && (
        <p className="catalog-status">
          Cargando videojuegos...
        </p>
      )}

      {!loading && error && (
        <p className="catalog-status catalog-status--error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        juegos.length === 0 && (
          <p className="catalog-status">
            No se han encontrado videojuegos.
          </p>
        )}

      {!loading &&
        !error &&
        juegos.length > 0 && (
          <>
            <div className="games-grid">
              {juegos.map((juego) => (
                <article
                  className="game-card"
                  key={juego.id}
                >
                  <a
                    className="game-card__link"
                    href={`/juegos/${juego.id}`}
                    aria-label={`Ver detalles de ${juego.titulo}`}
                  >
                    <div className="game-card__image-container">
                      {juego.imagen ? (
                        <img
                          className="game-card__image"
                          src={juego.imagen}
                          alt={`Carátula de ${juego.titulo}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="game-card__placeholder">
                          <span>
                            MatchGame
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="game-card__content">
                      <div className="game-card__header">
                        <h3>
                          {juego.titulo}
                        </h3>

                        <span className="game-card__score">
                          {Number(
                            juego.puntuacion
                          ).toFixed(1)}
                        </span>
                      </div>

                      <p className="game-card__genre">
                        {juego.genero}
                      </p>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {pagination.totalPages >
              1 && (
              <nav
                className="pagination"
                aria-label="Paginación del catálogo"
              >
                <button
                  type="button"
                  onClick={
                    handlePaginaAnterior
                  }
                  disabled={
                    pagination.page <= 1
                  }
                >
                  Anterior
                </button>

                <span>
                  Página{" "}
                  {pagination.page} de{" "}
                  {
                    pagination.totalPages
                  }
                </span>

                <button
                  type="button"
                  onClick={
                    handlePaginaSiguiente
                  }
                  disabled={
                    pagination.page >=
                    pagination.totalPages
                  }
                >
                  Siguiente
                </button>
              </nav>
            )}
          </>
        )}

      <style>{`
        .catalog-controls {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .search-form {
          display: flex;
          gap: var(--space-1);
          max-width: 650px;
        }

        .search-form input,
        .filter-control select {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-small);
          background-color: var(--color-bg-secondary);
          color: var(--color-text-primary);
        }

        .search-form input {
          flex: 1;
          min-width: 0;
          padding: 10px 12px;
        }

        .search-form button,
        .reset-filters,
        .pagination button {
          padding: 10px 16px;
          border-radius: var(--radius-small);
          color: var(--color-text-primary);
          font-weight: 600;
        }

        .search-form button {
          border: 0;
          background-color: var(--color-primary);
        }

        .search-form .button-secondary,
        .reset-filters {
          border: 1px solid var(--color-primary);
          background-color: transparent;
        }

        .filters {
          display: flex;
          align-items: end;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .filter-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 190px;
        }

        .filter-control label {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .filter-control select {
          padding: 10px 12px;
        }

        .catalog-summary {
          margin-bottom: var(--space-3);
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .games-grid {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fill,
              minmax(210px, 1fr)
            );
          gap: var(--space-3);
        }

        .game-card {
          overflow: hidden;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          background-color: var(--color-card);
          transition:
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .game-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
        }

        .game-card__link {
          display: block;
          height: 100%;
        }

        .game-card__image-container {
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background-color: var(--color-bg-secondary);
        }

        .game-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .game-card:hover .game-card__image {
          transform: scale(1.03);
        }

        .game-card__placeholder {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          color: var(--color-text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .game-card__content {
          padding: var(--space-2);
        }

        .game-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-2);
        }

        .game-card__header h3 {
          font-size: 1.1rem;
        }

        .game-card__score {
          flex-shrink: 0;
          padding: 4px 8px;
          border-radius: var(--radius-small);
          background-color: var(--color-primary);
          color: var(--color-text-primary);
          font-size: 0.875rem;
          font-weight: 700;
        }

        .game-card__genre {
          margin-top: var(--space-1);
          font-size: 0.875rem;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin-top: var(--space-4);
        }

        .pagination span {
          color: var(--color-text-secondary);
        }

        .pagination button {
          border: 1px solid var(--color-primary);
          background-color: transparent;
        }

        .pagination button:not(:disabled):hover {
          background-color: var(--color-primary);
        }

        .pagination button:disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }

        .catalog-status {
          padding-block: var(--space-4);
          text-align: center;
        }

        .catalog-status--error {
          color: var(--color-error);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .search-form {
            max-width: none;
            flex-wrap: wrap;
          }

          .search-form input {
            flex-basis: 100%;
          }

          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-control,
          .reset-filters {
            width: 100%;
          }

          .pagination {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}