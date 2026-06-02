const usuarios = [
  { id: 1, estado: "activo" },
  { id: null, estado: "activo" }, // Elemento inválido
  { id: 3, estado: "inactivo" }
];

for (const usuario of usuarios) {
  // Condición: saltar si el ID es nulo
  if (usuario.id === null || usuario.id === undefined) {
    continue;
  }  
  console.log(`Enviando correo al usuario ${usuario.id}`);
}

let validos = []
for (let usuario of usuarios) {
  if (usuario.id !== null) {
    validos.push(usuario)
     console.log(`Enviando correo al usuario ${usuario.id}`);
  }
}