export class Productos {
    constructor(
        public id: number,
        public tipo_producto: string,
        public nombre: string,
        public descripcion: string,
        public unidades: number,
        public precio_unidad: number,
        public finca_id: number
    ) { }
}
