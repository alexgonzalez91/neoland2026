let productos = [
 "Notebook",
 "Mouse",
 "Monitor",
 "Teclado"
];

for (let producto of productos){
    if (producto !== 'Monitor'){ 
        continue;
    }
      console.log("El producto encontrado es:", producto)  
}