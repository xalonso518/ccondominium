import { ArchivoInput } from '../file/ArchivoInput';

export class GastoAgregar {
    // tslint:disable-next-line: variable-name
    _id: string;
    usuario: string;
    tipoGasto: string;
    importe: number;
    mes: number;
    anio: number;
    nota: string;
    file: ArchivoInput;
}
