let carrito = [
  { id: 1, producto: "Notebook Pro", precio: 1200, cantidad: 1, categoria: "Hardware" },
  { id: 2, producto: "Mouse Inalámbrico", precio: 45, cantidad: 2, categoria: "Periféricos" },
  { id: 3, producto: "Teclado Mecánico", precio: 90, cantidad: 1, categoria: "Periféricos" },
  { id: 4, producto: "Monitor 24' Full HD", precio: 250, cantidad: 1, categoria: "Hardware" },
  { id: 5, producto: "Auriculares Gamer", precio: 75, cantidad: 1, categoria: "Audio" },
  { id: 6, producto: "Cable HDMI 2.0", precio: 15, cantidad: 3, categoria: "Accesorios" },
  { id: 7, producto: "Silla de Oficina", precio: 300, cantidad: 1, categoria: "Muebles" },
  { id: 8, producto: "Webcam 1080p", precio: 60, cantidad: 1, categoria: "Accesorios" },
  { id: 9, producto: "Pad Mouse XL", precio: 20, cantidad: 2, categoria: "Periféricos" },
  { id: 10, producto: "Disco Externo 1TB", precio: 110, cantidad: 1, categoria: "Hardware" }
];

// ================= ESTRUCTURA SWITCH PARA EJECUCIÓN =================

function ejecutarGestion(opcion) {
    switch (opcion) {
        case 1:
            console.log("--- LISTA DE PRODUCTOS ---");
            for (let item of carrito) {
                console.log(`Producto: ${item.producto} - Precio: ${item.precio} - Cantidad: ${item.cantidad} - Categoria: ${item.categoria}`);
            }
            break;

        case 2:
            console.log("--- TOTALES POR PRODUCTO ---");
            for (let item of carrito) {
                console.log(`${item.producto} → Total: $${calcularTotalProducto(item)}`);
            }
            break;

        case 3: 
            let totalEjemplo = calcularTotalProducto(carrito[0]);
            console.log(`Prueba Parte 3: El total de ${carrito[0].producto} es $${totalEjemplo}`);
            break;

        case 4: 
            let totalGeneral = 0;
            for (let item of carrito) {
                totalGeneral += calcularTotalProducto(item);
            }
            console.log(`TOTAL GENERAL DEL CARRITO: $${totalGeneral}`);
            break;

        case 5: 
            console.log("--- FILTROS ---");
            for (let item of carrito) {
                if (item.categoria === "Hardware" || calcularTotalProducto(item) > 100) {
                    console.log(`Filtrado: ${item.producto} (${item.categoria}) - $${item.precio}`);
                }
            }
            break;

        case 6:
            let cantTotal = 0;
            for (let item of carrito) { cantTotal += item.cantidad; }
            console.log(`Cantidad total de artículos: ${cantTotal}`);
            break;

        case 7:
            let buscar = "Mouse Inalámbrico";
            let encontrado = false;
            for (let item of carrito) {
                if (item.producto === buscar) encontrado = true;
            }
            console.log(encontrado ? "Producto encontrado" : "No encontrado");
            break;

        case 8:
            let masCaro = carrito[0];
            for (let item of carrito) {
                if (item.precio > masCaro.precio) masCaro = item;
            }
            console.log(`El más caro es: ${masCaro.producto} ($${masCaro.precio})`);
            break;

        case 9:
            let nuevoProd = { id: 11, producto: "Joystick PS5", precio: 80, cantidad: 1, categoria: "Accesorios" };
            carrito.push(nuevoProd);
            console.log(`Producto "${nuevoProd.producto}" agregado. Nuevo largo del array: ${carrito.length}`);
            break;

        default:
            console.log("Opción inválida (Debe ser del 1 al 9)");
    }
}

// ================= 1. MOSTRAR PRODUCTOS =================
function mostrarProductos() {
    console.log("--- Lista de productos ---");
    for (let item of carrito) {
        console.log(`Producto: ${item.producto} - Precio: ${item.precio} - Cantidad: ${item.cantidad} - Categoria: ${item.categoria}`);
    }
}

// ================= 2. TOTALES PRODUCTOS INDIVIDUALES =================
function mostrarTotalProductoIndividual() {
    console.log("--- Total de Productos Individual ---");
    for (let item of carrito) {
        let total = calcularTotalProducto(item);
        console.log(`${item.producto} → Total: ${total}`);
    }
}

// ================= 3. TOTAL DE UN PRODUCTO (FUNCIÓN AUXILIAR) =================
function calcularTotalProducto(item) {
    return item.precio * item.cantidad;
}

// ================= 4. TOTAL GENERAL =================
function calcularTotalGeneral() {
    let totalGeneral = 0;
    for (let item of carrito) {
        totalGeneral += calcularTotalProducto(item);
    }
    console.log(`--- Total General de la compra: $${totalGeneral} ---`);
    return totalGeneral;
}

// ================= 5. FILTRAR =================
function filtrarProductos() {
    console.log("--- Productos mayores a $100 ---");
    for (let item of carrito) {
        if (item.precio > 100) {
            console.log(`- ${item.producto} ($${item.precio})`);
        }
    }

    console.log("--- Productos de Categoría 'Hardware' ---");
    for (let item of carrito) {
        if (item.categoria === "Hardware") {
            console.log(`- ${item.producto}`);
        }
    }
}

// ================= 6. CONTAR =================
function contarProductos() {
    let unidadesTotales = 0;
    let categorias = {};

    for (let item of carrito) {
        // Sumar unidades físicas
        unidadesTotales += item.cantidad;

        // Contar por categoría
        if (categorias[item.categoria]) {
            categorias[item.categoria]++;
        } else {
            categorias[item.categoria] = 1;
        }
    }

    console.log(`Cantidad total de unidades: ${unidadesTotales}`);
    console.log("Productos por categoría:", categorias);
}

// ================= 7. BÚSQUEDA =================
function buscarProducto(nombre) {
    let encontrado = false;
    for (let item of carrito) {
        if (item.producto.toLowerCase() === nombre.toLowerCase()) {
            encontrado = true;
            break;
        }
    }
    console.log(encontrado ? `Producto "${nombre}" encontrado` : "No encontrado");
}

// ================= 8. PRODUCTO MÁS CARO =================
function productoMasCaro() {
    let masCaro = carrito[0];
    for (let item of carrito) {
        if (item.precio > masCaro.precio) {
            masCaro = item;
        }
    }
    console.log(`El producto más caro es: ${masCaro.producto} con un precio de $${masCaro.precio}`);
}

// ================= 9. MANIPULACIÓN (AGREGAR) =================
function agregarProducto(nuevo) {
    carrito.push(nuevo);
    console.log(`Se agregó ${nuevo.producto} al carrito.`);
}

// ================= PRUEBAS DEL SWITCH =================

ejecutarGestion(4)
