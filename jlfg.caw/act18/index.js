//El index solo arranca y prueba no tiene logica de negocio
import * as ctrl from "./src/controllers/producto.controller.js"
import {calcularTotal,formatearPrecio} from "./src/utils/calculo.js"

console.log("-----Listar----");
console.log(ctrl.listarDisponibles());
console.log("-----Crear----")
const creado= ctrl.crearProducto({nombre:"Sincronizadas", precio: 32, categoria:"comida"});
console.log(creado);