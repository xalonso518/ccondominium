import { ArchivoInput } from '../file/ArchivoInput';

export class CuotaAgregar {
    // tslint:disable-next-line: variable-name
    _id: string;
    usuario: string;
    casa: string;
    tipoCuota: string;
    importe: number;
    mes: number;
    anio: number;
    nota: string;
    file: ArchivoInput;
}
