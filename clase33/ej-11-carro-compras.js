let carro = ["azucar", "leche", "harina", "naranja", "sandia"];
console.log(carro);
carro.push("kiwis", "manzana");
console.log(carro);
carro.splice(2, 1);
console.log(carro);
console.log(carro.join(","));
console.log(`Los productos dentro del carro son: ${carro}`);
console.log(`La cantidad de productos dentro del carro es: ${carro.length}`);