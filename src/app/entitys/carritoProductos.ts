import { Productos } from "./productos";

export class carritoProductos {
    constructor(
        public id: number,
        public id_producto: number,
        public cantidad: number, 
        public precio_total: number,
        public id_carrito: number,
        public nombre?: string,
        public producto?: Productos 
    ) {}
}