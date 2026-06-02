let impares = []
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) { // Si el número es par...
        continue;      // ...salta a la siguiente iteración
    }
    console.log(`Procesando número impar: ${i}`);
  impares.push(i)
}
console.log(impares)
