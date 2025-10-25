export class DetalleCompra {
    constructor(
        public id_compra: number,
        public id_producto: number,
        public producto: string,
        public tipo_producto: string,
        public cantidad: number,
        public precio_total: number
    ) {}
}