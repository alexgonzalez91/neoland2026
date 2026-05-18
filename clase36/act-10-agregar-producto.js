let carrito = [
 { producto: "Notebook", precio: 1000, cantidad: 3 },
 { producto: "Mouse", precio: 50, cantidad: 2 },
 { producto: "Teclado", precio: 100, cantidad: 4 },
 { producto: "Monitor", precio: 200, cantidad: 1 }
];

let agregarAlCarrito = () => {
  
    let nombre = prompt("¿Qué producto quieres agregar?");
    let precio = Number(prompt("¿Cuál es el precio?"));
    let cantidad = Number(prompt("¿Cuántas unidades?"));
 
    let nuevoProducto = {
        producto: nombre,
        precio: precio,
        cantidad: cantidad
    };

    carrito.push(nuevoProducto);

    
    console.log("Producto agregado correctamente:");
    console.table(carrito);
};

agregarAlCarrito();