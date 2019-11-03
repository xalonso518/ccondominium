export class CumplimientoView {
    // tslint:disable-next-line: variable-name
    _id: string;
    usuario: string;
    casa: string;
    tipoCumplimiento: string;
    nivel: string;
    importe: number;
    fechaAlta: Date;
    mes: number;
    anio: number;
    archivos: CumplimientoArchivoView[];
    nota: string;
    estado: string;
}

export class CumplimientoArchivoView {
    // tslint:disable-next-line: variable-name
    _id: string;
    nombre: string;
    url: string;
    estado: string;
}
