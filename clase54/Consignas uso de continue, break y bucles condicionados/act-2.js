let usuarios = [
 { nombre: "Ana", activo: true },
 { nombre: "Juan", activo: false },
 { nombre: "Pedro", activo: true },
 { nombre: "María", activo: false }
];


for (let usuario of usuarios){
    if (usuario.activo === false){ 
        continue;
    }
      console.log("Los usuarios activos son:", usuario)  
}