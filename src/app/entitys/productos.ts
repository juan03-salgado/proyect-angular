export class Productos {
    constructor(
        public id: number,
        public nombre: string,
        public precioEstimado: number,
        public descripcion: string,
        public agricultorId: number,
        public mercadoId: number
    ) { }
}
