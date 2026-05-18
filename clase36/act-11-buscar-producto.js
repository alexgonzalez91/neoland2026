let carrito = [
 { producto: "Notebook", precio: 1000, cantidad: 3 },
 { producto: "Mouse", precio: 50, cantidad: 2 },
 { producto: "Teclado", precio: 100, cantidad: 4 },
 { producto: "Monitor", precio: 200, cantidad: 1 }
];

let buscar = prompt("¿Qué producto buscas?");
let encontrado = false;

for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].producto === buscar) {
        encontrado = true;
        break;
    }
}

if (encontrado) {
    alert("Existe");
} else {
    alert("No existe");
}