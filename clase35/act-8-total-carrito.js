let carrito = [
 { producto: "Notebook", precio: 1000, cantidad: 1 },
 { producto: "Mouse", precio: 50, cantidad: 2 },
];

const calcularTotalCarrito = (lista) => {
  let total = 0;
  
  for (let item of lista) {
    total += item.precio * item.cantidad;
  }
  return total;
};

const totalFinal = calcularTotalCarrito(carrito);

console.log("El total del carrito es: $" + totalFinal);