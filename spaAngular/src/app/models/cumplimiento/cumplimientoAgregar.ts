import { ArchivoInput } from '../file/ArchivoInput';

export class CumplimientoAgregar {
    // tslint:disable-next-line: variable-name
    _id: string;
    usuario: string;
    casa: string;
    tipoCumplimiento: string;
    nivel: string;
    importe: number;
    mes: number;
    anio: number;
    nota: string;
    file: ArchivoInput;
}
