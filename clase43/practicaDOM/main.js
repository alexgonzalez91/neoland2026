
/* ===== 1. Modificación de Contenido y Atributos ===== */

// Cambiar la imagen de portada

const imagen = document.querySelector("#imagenPortada")
const campoImagen = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600";
const campoDescripcion = "Notebook Zenbook Pro Ultra"

imagen.setAttribute("src", campoImagen)
imagen.setAttribute("alt", campoDescripcion)


// Actualizar enlace de contacto

const enlaceContacto = document.querySelector("#contacto")
enlaceContacto.setAttribute("href", "mailto:contact@spv.com")


//Definir el modelo del producto

const modeloProducto = document.querySelector("#titulo")
modeloProducto.textContent = "Notebook Zenbook Pro Ultra"


// Actualizar el título principal

const nombrePagina = document.querySelector(".tituloVentas")
nombrePagina.textContent = "Apple"


// Redactar la descripción

const parrafoDescripcion = document.querySelector(".parrafo")
parrafoDescripcion.textContent = "Lleva tu productividad al siguiente nivel con la nueva ZenBook Pro Ultra X15. Equipada con un procesador de última generación, 32GB de RAM y una pantalla OLED que da vida a tus proyectos."

/* ===== 1. Fin de Modificación de Contenido y Atributos ===== */


/* ===== 2. Estilos y Estructura ===== */

// Estilar el título principal

nombrePagina.style = "font-size: 70px; color: #1d1d1f; letter-spacing: -0.022em; font-family: Helvetica, Arial, sans-serif; text-align: center"

// Agregar el precio del producto

const precioElemento = document.createElement("p");
precioElemento.textContent = "Precio: Desde 699 €";
precioElemento.style = "font-weight: bold; color: #e63946;";

const columnaDerecha = document.querySelector(".der");
columnaDerecha.appendChild(precioElemento);

/* ===== 2. Fin de Estilos y Estructura ===== */

/* ===== 3. Interactividad y Eventos ===== */

// Botón de especificaciones

const botonSpecs = document.querySelector("#boton")
const bloqueSpecs = document.querySelector("#especificaciones")

botonSpecs.addEventListener("click", function() {
    bloqueSpecs.style.display = "block";
});

// Formulario "Mantenerme informado

const miFormulario = document.querySelector("form")
const casillaEmail = document.querySelector("#email")

miFormulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const emailCapturado = casillaEmail.value;
    console.log("Email listo para enviar: " + emailCapturado);
});


/* ===== 3. Fin de Interactividad y Eventos ===== */

