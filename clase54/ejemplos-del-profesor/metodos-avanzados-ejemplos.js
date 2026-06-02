let edades = [15, 19, 20, 40, 32, 18, 27];

// Si todos cumplen, es TRUE, sino... FALSE
// EVERY
edades.every(function (edad) {
  return edad >= 18;
});

// Si alguno cumple
// SOME
edades.some(function (edad) {
  return edad >= 18;
});

// Para cuando encuentre la primer coincidencia, PARA de recorrer

// FIND
// Más pensado para almacenar
edades.find(function (edad) {
  return edad >= 18;
});

// Más pensado para que haga alguna acción con el valor que encuentre primero
for (let edad of edades) {
  if (edad >= 18) {
    console.log(edad);
    break;
  }
}

// REDUCE

// tradicional
let suma = 0; 
for (let edad of edades) {
  suma += edad;
}
console.log(suma);

// ejemplo

let edadesSumadas = edades.reduce(
  function (acc,edad) {
    return acc + edad
  },
  0 // valor inicial
);
let promedio = edadesSumadas / edades.length
promedio.toFixed(2)
