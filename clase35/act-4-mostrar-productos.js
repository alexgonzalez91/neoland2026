let productos = [
 { nombre: "Notebook", precio: 1000 },
 { nombre: "Mouse", precio: 50 },
 { nombre: "Teclado", precio: 100 },
];

function mostrarProductos(lista) {
    console.log("Lista de Productos");
    
   
    for (let producto of lista) {
        console.log(`Producto: ${producto.nombre}`);
        console.log(`Precio: $${producto.precio}`);
    }
}


mostrarProductos(productos);