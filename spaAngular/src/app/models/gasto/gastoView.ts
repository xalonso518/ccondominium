export class GastoView {
    // tslint:disable-next-line: variable-name
    _id: string;
    usuario: string;
    tipoGasto: string;
    importe: number;
    fechaAlta: Date;
    mes: number;
    anio: number;
    archivos: GastoArchivoView[];
    nota: string;
    estado: string;
}

export class GastoArchivoView {
    // tslint:disable-next-line: variable-name
    _id: string;
    nombre: string;
    url: string;
    estado: string;
}
