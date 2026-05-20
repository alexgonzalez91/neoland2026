
//Llamamos a los elementos de html
const boton = document.querySelector("#btn-mostrar-ocultar");
const texto = document.querySelector("#texto-secreto");


//Le metemos click
boton.addEventListener("click", () => {

    //Sirve para mostrar y ocultar el texto
    texto.classList.toggle("oculto");
});