let productos = [
 { nombre: "Notebook", precio: 1000 },
 { nombre: "Mouse", precio: 50 },
 { nombre: "Teclado", precio: 100 },
];

const calcularTotal = (lista) => {
  let total = 0;
  
  for (let producto of lista) {
    total = total + producto.precio;
  }
  
  return total
  console.log("El precio total de los productos es: $" + total);
}

calcularTotal(productos);
