const productosHtml = document.querySelectorAll(".producto-item");


for (const producto of productosHtml) {
    
    const botonCompra = document.createElement("button");
    
    
    botonCompra.textContent = "Agregar al carrito / comprar";
    
    botonCompra.addEventListener("click", () => {
        
        const nombreProducto = producto.querySelector("h3").textContent;
        alert(`¡Has añadido ${nombreProducto} al carrito!`);
    });

    
    producto.appendChild(botonCompra);
}