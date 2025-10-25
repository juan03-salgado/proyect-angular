import { DetalleCompra } from "./detalleCompra";

export class Compras {
    constructor(
        public id_compra: number,
        public id_carrito: number,
        public cliente?: string,
        public productos?: DetalleCompra[]
    ) {}
}