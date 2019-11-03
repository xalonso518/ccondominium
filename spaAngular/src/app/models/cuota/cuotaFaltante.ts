export class CuotaFaltanteTable {
    // tslint:disable-next-line: variable-name
    _id: string;
    casa: string;
    importe: number;
}

export class CuotaFaltante {
    casas: CuotaFaltanteCasas[];
    cuotas: CuotaFaltanteImporte[];
}

export class CuotaFaltanteCasas {
    usuario: string;
    casa: string;
}

export class CuotaFaltanteImporte {
    // tslint:disable-next-line: variable-name
    _id: string;
    casa: string;
    importe: number;
}
