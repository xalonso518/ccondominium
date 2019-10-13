export class DatosUsuario {
    public nombre: string;
    public imagen: string;
    public casa: string;

    constructor(nombre = '', casa = '', imagen = '') {
        this.nombre = nombre;
        this.casa = casa;
        this.imagen = imagen;
    }
}
