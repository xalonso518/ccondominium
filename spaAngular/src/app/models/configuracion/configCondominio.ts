export class ConfigCondominio {
    public nombre: string;
    public cuotaMensual: number;
    public otroCuotaMensual: number;
    public casas: number;

    constructor(nombre = '', cuotaMensual = 0, otroCuotaMensual = 0, casas = 0) {
        this.nombre = nombre;
        this.cuotaMensual = cuotaMensual;
        this.otroCuotaMensual = otroCuotaMensual;
        this.casas = casas;
    }
}
