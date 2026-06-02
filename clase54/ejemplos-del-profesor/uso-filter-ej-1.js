let productos = [ 
  { nombre: "Notebook", precio: 1200 }, 
  { nombre: "Mouse", precio: 50 }, 
  { nombre: "Monitor", precio: 300 } 
];

/*
for (let producto of productos) {
  // Mostrar productos más económicos
  if (producto.precio <= 500) {
     console.log(producto)
     productosEconomicos.push(producto)
  }
}
*/

let productosEconomicos = []
for (let producto of productos) {
  // Descartar productos CAROS
  if (producto.precio > 500) {
    continue;
  }
  // Todas las demás instrucciones
  productosEconomicos.push(producto)

}

let productosBaratos = productos.filter(
  function(producto) {
    return producto.precio < 500
  }
)
/* let productosBaratos = productos.filter(producto => producto.precio < 500) */
productosEconomicos
productosBaratos