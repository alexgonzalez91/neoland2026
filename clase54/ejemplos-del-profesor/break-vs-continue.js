let usuarios = [
 "Ana",
 "Juan",
 "Pedro",
 "María",
 "Lucas"
];

// Uso de 'break'
for (let usuario of usuarios) {
  if (usuario == "Pedro") {
    console.log("Se encontró")
    break; // termina la ejecución y no sigue recorriendo el array.
  } else {
    console.log("No se encontró")
  }
}

// Uso de 'continue'
// Cuando cumple la condición 'reinicia' desde arriba el bucle sin continuar luego de la condición.
let productos = [
 { nombre: "Notebook", stock: 5 },
 { nombre: "Mouse", stock: 0 },
 { nombre: "Monitor", stock: 2 },
 { nombre: "Teclado", stock: 0 }
];
z
// Quiero ver los productos con stock
for (let producto of productos) {
    if (producto.stock == 0) {
      continue;
    }
     console.log(producto)
}