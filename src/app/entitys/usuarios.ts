export class Usuarios {
    constructor(
        public id: number,
        public nombre_user: string,
        public email: string,
        public contrasena: string,
        public id_rol: number
    ) {}
}