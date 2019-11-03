export class CuotaView {
    // tslint:disable-next-line: variable-name
    _id: string;
    usuario: string;
    casa: string;
    tipoCuota: string;
    importe: number;
    fechaAlta: Date;
    mes: number;
    anio: number;
    archivos: CuotaArchivoView[];
    nota: string;
    estado: string;
}

export class CuotaArchivoView {
    // tslint:disable-next-line: variable-name
    _id: string;
    nombre: string;
    url: string;
    estado: string;
}
