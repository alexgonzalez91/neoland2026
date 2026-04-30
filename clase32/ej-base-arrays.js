let nombre = 'Santiago';
let nombres = ['Marcos', 'David', 'Alex G', 'Claudia', 'Jimena'];
// índices        0         1        2         3          4
`La longitud del array nombres es: ${nombres.length}`;
nombres[1];

for (let contador = 0; contador < nombres.length; contador++) {
  console.log(`iteración nro ${contador} y su valor es: ${nombres[contador]}`);
}

// for..of (bucle especialmente para los arrays)
for (let estudiante of nombres) {
  console.log(estudiante);
}
