export class Insumos {
    constructor(
        public id: number,
        public nombre: string,
        public precioUnitario: number,
        public descripcion: string,
        public cantidadDisponible: number,
        public proveedorId: number
    ) { }
}
