
//Creamos la variable
let contador = 0;

//Llamamos a los elementos de html
const numeroPantalla = document.querySelector("#numero-contador")
const botonSumar = document.querySelector("#btn-sumar")
const botonRestar = document.querySelector("#btn-restar")

//Le metemos el click al boton sumar
botonSumar.addEventListener("click", () =>{
    contador++
    numeroPantalla.textContent = contador;
});

//Le metemos el click al boton restar
botonRestar.addEventListener("click", () => {
    contador--
    numeroPantalla.textContent = contador

});

