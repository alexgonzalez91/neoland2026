let productos = [
 { nombre: "Notebook", precio: 1000 },
 { nombre: "Mouse", precio: 50 },
 { nombre: "Teclado", precio: 100 },
];
function mostrarProductosCaros(lista) {
    console.log("Productos mayores a 100");
    
    for (let producto of lista) {
        if (producto.precio > 100) {
            console.log(`Producto: ${producto.nombre}`);
            console.log(`Precio: $${producto.precio}`);
        }
    }
}
mostrarProductosCaros(productos);