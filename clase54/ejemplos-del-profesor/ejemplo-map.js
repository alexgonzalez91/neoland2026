let productos = [ 
  { nombre: "Notebook", precio: 1200 }, 
  { nombre: "Mouse", precio: 50 }, 
  { nombre: "Monitor", precio: 300 } 
];


// Uso de .map()
let valores = productos.map(
  function(obj) {
    return `
      <div>
        <h2>${obj.nombre}</h2>
        ${obj.precio < 500 
            ? `<strong>¡En oferta!</strong>` // true
            : `<strong>No está en oferta</strong>` // false
          } 
      </div>
    `
  }
)
valores

