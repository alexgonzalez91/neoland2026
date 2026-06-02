// forEach(callback)

let productos = [
 { nombre: "Notebook", stock: 5 },
 { nombre: "Mouse", stock: 0 },
 { nombre: "Monitor", stock: 2 },
 { nombre: "Teclado", stock: 0 }
];

// for (let producto of productos) {
let filtrados = productos.forEach(
  function(producto) {
     if (producto.stock > 0) {
      continue // Da error porque no se permite el uso de break o continue dentro del bucle forEach
    }
     console.log(producto)
  }
)