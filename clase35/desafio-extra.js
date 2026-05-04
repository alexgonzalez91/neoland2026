let productos = [
 { nombre: "Notebook", precio: 1000 },
 { nombre: "Mouse", precio: 50 },
 { nombre: "Teclado", precio: 100 }
];

function calcularPromedio(lista) {
    let suma = 0;
  
    for (const producto of lista) {
        suma += producto.precio;
    }
  
    const promedio = suma / lista.length;

    console.log("Cálculo del promedio");
    console.log(`El precio promedio es: $${promedio}`);
};

calcularPromedio(productos);