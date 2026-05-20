
//creamos el array de productos
const productos = [
    { nombre: "Notebook Zenbook Pro", precio: 1200},
    {nombre: "Teclado Mecánico Epomarker", precio: 89},
    {nombre: "Ratón Inalámbrico Ergonómico", precio: 45}
];


//Llamamos al contenedor creado en html
const contenedor = document.querySelector("#contenedor-productos");


//Recorremos todo el array
for(const producto of productos){
    const tarjeta = document.createElement("div");


    //Con css definimos la tarjeta
    tarjeta.style = "border: 1px solid black; margin: 10px; padding = 10px"


    //Utilizamos innerHtml para introducir el array en la tarjeta
    tarjeta.innerHTML = `<h3>${producto.nombre}</h3><p>$${producto.precio}</p><button>Comprar</button>`;


    //Metemos la tarjeta dentro del contenedor
    contenedor.appendChild(tarjeta);


}