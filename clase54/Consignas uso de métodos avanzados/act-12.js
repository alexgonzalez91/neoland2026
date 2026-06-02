let productos = [
 { id: 1, nombre: "Notebook", precio: 1200, stock: 5, categoria: "Hardware" },
 { id: 2, nombre: "Mouse", precio: 45, stock: 20, categoria: "Periféricos" },
 { id: 3, nombre: "Teclado", precio: 90, stock: 10, categoria: "Periféricos" },
 { id: 4, nombre: "Monitor", precio: 250, stock: 0, categoria: "Hardware" },
 { id: 5, nombre: "Auriculares", precio: 75, stock: 8, categoria: "Audio" }
];

let productoTotalStock = productos.reduce((acumulador, mercancia) => {
  return acumulador + mercancia.stock;
}, 0);

console.log("La cantidad total de productos en stock es:", productoTotalStock)