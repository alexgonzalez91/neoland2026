let carrito = [
 { producto: "Notebook", precio: 1000, cantidad: 1 },
 { producto: "Mouse", precio: 50, cantidad: 2 },
];

function mostrarCarrito(lista){
  console.log("Detalle del carrito");
  
  for (let item of lista) {
    const subtotal = item.precio * item.cantidad;
    console.log(`Producto: ${item.producto}`); 
    console.log(`Cantidad: ${item.cantidad}`)
    console.log(`Total: $${subtotal}`);
  }
  
};

mostrarCarrito(carrito)