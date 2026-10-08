//Ejercicio de curso de arreglos con crud -menu version de referencia
//---Paso 1 El arreglo----
const productos = [
    {id: crypto.randomUUID(),nombre :"Molletes", precio:30, categoria:"comida", disponible:true},
    {id: crypto.randomUUID(),nombre:"Jugo de naranja",precio:18, categoria:"bebida",disponible:true},
    {id: crypto.randomUUID(),nombre:"Gelatina",precio:12,categoria:"postre",disponible:false}
];
//---Paso 2 y 3 Leer----
const listar = () => productos ;
const listarDisponibles = () => productos.filter((p) => p.disponible);
//----Paso 4 Buscar uno----
const obtenerPorId = (id) => productos.find((p) => p.id === id);
//obtenerPorId("No-existe") devuelve undefined:el find no encontro nada
//console.log(obtenerPorId("No-existe").nombre)
//cannot read properties of undefined
//el programa cae se convierte en un error 404 bien manejado
//----Paso 5 Crear----
function crear(datos){
    const nuevo ={id:crypto.randomUUID(),disponible:true, ...datos}
    productos.push(nuevo);
    return nuevo;
};
//----Paso 6 Actualizar----
function actualizar(id,cambios){
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) return null;
    productos[i] = {...productos[i], ...cambios};
    return productos[i];
};
//----Paso 7 Borrado logico----
function eliminar(id){
    const producto = obtenerPorId(id);
    if(!producto)return null;
    producto.disponible = false;
    return producto;
}
//Razon: Los pedidos viejos guardan el id de su producto
//si lo borro de verdad, el historial queda apuntando a algo que ya no existe
//El corte del dia se rompe: Marcarlo como no disponible lo saca del menu
//Sin destruir la informacion y ademas se puede revertir
//----Paso 8 Total con reduce----
function calcularTotal(pedido){
    return pedido.items.reduce((suma, item) => suma + item.precio * item.cantidad,0);
};
//----Paso 9 ¿Ya existe?----
const existeNombre = (nombre) => 
    productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
const buscarPorTexto = (texto) => 
    productos.filter((p) => p.nombre.toLowerCase().includes(texto.toLowerCase()));
//----Paso 10 Pruebas----
console.log("----Listar----");
console.log(listar())
console.log("----listarDisponibles----")
console.log(listarDisponibles().map((p) => p.nombre));
console.log("-----Crear-----")
const creado=crear({nombre:"Sincronizada",precio:32,categoria:"comida"});
console.log(creado);
console.log("----Obtener por id-----")
console.log(obtenerPorId(creado.id).nombre);
console.log(obtenerPorId("no-existe",{precio:1}));
console.log("-----Actualizar-----")
console.log(actualizar(creado.id,{precio:35}));
console.log(actualizar("no-existe",{precio:1}));
console.log("-----Eliminado logico-----")
console.log(eliminar(creado.id).disponible);
console.log("Disponibles ahora",listarDisponibles().length);
console.log("------Calcular total-----")
const pedido = {
    folio:"PR-0341",
    items:[
        {nombre:"Molletes", precio: 30, cantidad: 2,},
        {nombre:"Jugo", precio: 18, cantidad: 1},
    ]
};
console.log(calcularTotal(pedido));
console.log("-----Existe nombre-----")
console.log(existeNombre("Gelatina"),existeNombre("pizza"));
console.log("------Buscar por texto-----")
console.log(buscarPorTexto("ju").map((p) => p.nombre));