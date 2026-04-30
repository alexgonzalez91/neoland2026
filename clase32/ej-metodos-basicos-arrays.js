let nombres = ['Marcos', 'David', 'Alex', 'Claudia', 'Jimena', 'Alex'];
// índices        0         1        2         3          4

// Métodos (funciones) de arrays básicos

// manejo de valores por los últimos lugares
nombres.push('Sebas'); // Añade un nuevo valor al último lugar del array 'nombres' y devuelve el valor de la nueva longitud
nombres.pop(); // Remueve el último valor del array y devuelve el valor removido.

// manejo de valores por los primeros lugares
nombres.unshift('Alex M'); // Añade un nuevo valor al primer lugar del array 'nombres' y devuelve el valor de la nueva longitud
nombres.shift(); // Remueve el primer valor del array y devuelve el valor removido.

// ¿Cómo encontrar un valor en el array?
nombres.indexOf('Alex'); // devuelve la posición en el que se encuentra el valor

let buscar = 'alex'; // prompt("¿Qué valor deseas buscar?")

if (nombres.indexOf(buscar) > -1) {
  console.log(`Se ha encontrado el nombre 😃!`);
} else {
  console.log(`No se ha encontrado el nombre 🙁!`);
}