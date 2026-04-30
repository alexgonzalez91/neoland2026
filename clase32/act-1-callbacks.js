let cantidadP = 79; 

const impuestoIVA = (cantidad) => cantidad * 1.21;
const impuestoReducido = (cantidad) => cantidad * 1.105;
const sinImpuesto = (cantidad) => cantidad;

function procesarFactura (cantidad, callbackCalculo){
    console.log ("Calculando total de la factura...");
    let resultado = callbackCalculo(cantidad);
    console.log ("total a pagar es: " + resultado)
}

procesarFactura(cantidadP, impuestoIVA);
procesarFactura(cantidadP, impuestoReducido);
procesarFactura(cantidadP, sinImpuesto)