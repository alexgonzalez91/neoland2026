

//Llamamos a los elementos de html
const inputNombre = document.querySelector("#input-nombre");
const inputComentario = document.querySelector("#input-comentario");
const botonPublicar = document.querySelector("#btn-publicar");
const muro = document.querySelector("#muro-comentarios");

//Le metemos click
botonPublicar.addEventListener("click", () => {
    
    //Obligamos ha publicar algo
    if (inputNombre.value === "" || inputComentario.value === "") {
        alert("Por favor, rellena ambos campos antes de publicar.");
        return; //Paramos si no esta relleno
    }

    //Creamos caja para nuevo comentario
    const nuevoComentario = document.createElement("div");
    
    //Ponemos css al nuevo comentario
    nuevoComentario.style = "border-bottom: 1px dashed gray; margin: 10px 0; padding: 10px"

    //Etiquetas de texto para información de inputs
    const usuario = document.createElement("strong");
    usuario.textContent = inputNombre.value + ": ";

    //Un p para el texto del comentario
    const texto = document.createElement("p");
    texto.textContent = inputComentario.value;

    //Metemos nombre y texto dentro de la caja
    nuevoComentario.appendChild(usuario);
    nuevoComentario.appendChild(texto);

    //Metemos el comentario dentro
    muro.appendChild(nuevoComentario);

    //Limpiamos para el siguiente
    inputNombre.value = "";
    inputComentario.value = "";
});