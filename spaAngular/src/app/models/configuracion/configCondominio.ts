export class ConfigCondominio {
    public _id: string;
    public nombre: string;
    public link: string;
    public cuotaMensual: number;
    public otroCuotaMensual: number;
    public casas: number;

    constructor(link = '', nombre = '', cuotaMensual = 0, otroCuotaMensual = 0, casas = 0) {
        this.link = link;
        this.nombre = nombre;
        this.cuotaMensual = cuotaMensual;
        this.otroCuotaMensual = otroCuotaMensual;
        this.casas = casas;
    }
}
