import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: "",
    }));

    setEnviado(false);
  }

  function validarFormulario() {
    const nuevosErrores = {};

    if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre =
        "El nombre debe tener al menos 2 caracteres.";
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(formData.email.trim())) {
      nuevosErrores.email =
        "Introduce un correo electrónico válido.";
    }

    if (formData.asunto.trim().length < 3) {
      nuevosErrores.asunto =
        "El asunto debe tener al menos 3 caracteres.";
    }

    if (formData.mensaje.trim().length < 10) {
      nuevosErrores.mensaje =
        "El mensaje debe tener al menos 10 caracteres.";
    }

    return nuevosErrores;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nuevosErrores =
      validarFormulario();

    if (
      Object.keys(nuevosErrores).length > 0
    ) {
      setErrores(nuevosErrores);
      setEnviado(false);
      return;
    }

    setErrores({});
    setEnviado(true);

    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  }

  return (
    <div className="contact-form-wrapper">
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            aria-invalid={
              Boolean(errores.nombre)
            }
          />

          {errores.nombre && (
            <p className="form-error">
              {errores.nombre}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={
              Boolean(errores.email)
            }
          />

          {errores.email && (
            <p className="form-error">
              {errores.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="asunto">
            Asunto
          </label>

          <input
            id="asunto"
            name="asunto"
            type="text"
            placeholder="¿Sobre qué quieres escribirnos?"
            value={formData.asunto}
            onChange={handleChange}
            aria-invalid={
              Boolean(errores.asunto)
            }
          />

          {errores.asunto && (
            <p className="form-error">
              {errores.asunto}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            name="mensaje"
            rows="6"
            placeholder="Escribe aquí tu mensaje..."
            value={formData.mensaje}
            onChange={handleChange}
            aria-invalid={
              Boolean(errores.mensaje)
            }
          />

          {errores.mensaje && (
            <p className="form-error">
              {errores.mensaje}
            </p>
          )}
        </div>

        <button
          className="submit-button"
          type="submit"
        >
          Enviar mensaje
        </button>

        {enviado && (
          <p
            className="form-success"
            role="status"
            aria-live="polite"
          >
            Mensaje validado correctamente. Gracias por contactar con MatchGame.
          </p>
        )}
      </form>

      <style>{`
        .contact-form-wrapper {
          padding: var(--space-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          background-color: var(--color-card);
        }

        .contact-form {
          display: grid;
          gap: var(--space-3);
        }

        .form-group {
          display: grid;
          gap: 6px;
        }

        .form-group label {
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-small);
          background-color: var(--color-bg-secondary);
          color: var(--color-text-primary);
          font: inherit;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 140px;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
          border-color: var(--color-primary);
        }

        .form-group input[aria-invalid="true"],
        .form-group textarea[aria-invalid="true"] {
          border-color: var(--color-error);
        }

        .form-error {
          color: var(--color-error);
          font-size: 0.875rem;
        }

        .submit-button {
          justify-self: start;
          padding: 12px 20px;
          border: 0;
          border-radius: var(--radius-small);
          background-color: var(--color-primary);
          color: var(--color-text-primary);
          font-weight: 700;
        }

        .submit-button:hover {
          background-color: var(--color-primary-secondary);
        }

        .form-success {
          padding: var(--space-2);
          border: 1px solid var(--color-success);
          border-radius: var(--radius-small);
          color: var(--color-success);
        }

        @media (max-width: 600px) {
          .contact-form-wrapper {
            padding: var(--space-3);
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}