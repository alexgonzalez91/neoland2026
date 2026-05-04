let carrito = [
 { producto: "Notebook", precio: 1000, cantidad: 1 }, 
 { producto: "Mouse", precio: 50, cantidad: 2 },      
 { producto: "Auriculares", precio: 40, cantidad: 3 },
];

let mostrarProductosCaros = (lista) => {
    console.log("Productos con precio mayor a 100");

    for (let item of lista) {
        let subtotal = item.precio * item.cantidad;

        if (subtotal > 100) {
            console.log(`Producto: ${item.producto}`)
        }
    }
};

mostrarProductosCaros(carrito);