let bebidas = ["agua", "jugo"];
console.log(bebidas);
let comidas = ["pizza", "pasta"];
console.log(comidas);

let cena = [...bebidas, ...comidas];
console.log(cena)



let bebidas = ["agua", "jugo"];
console.log(bebidas);
let comidas = ["pizza", "pasta"];
console.log(comidas);

bebidas.push(...comidas);
console.log(bebidas)