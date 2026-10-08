//El modelo es el unico que toca el arreglo
import {productos} from "../data/productos.js"

export const listar =() => productos;

export const listarDisponibles =() => productos.filter((p) => p.disponible);

export const obtenerPorId = (id) => productos.find((p) => p.id === id);

export const existeNombre = (nombre) => 
    productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase)

export function crear(datos){
    const nuevo = {id: crypto.randomUUID(),disponible:true, ...datos};
    productos.push(nuevo);
    return nuevo;
}
export function actualizar(id,cambios){
    const i = productos.findIndex((p) => p.i === id);
    if (i===-1)return null;
    productos[i] = [...productos[i],...cambios]
    return productos[i];
}

export function eliminar(id){
    const producto = obtenerPorId(id);
    if(!producto) return null;
    producto.disponible=false;
    return producto;
}