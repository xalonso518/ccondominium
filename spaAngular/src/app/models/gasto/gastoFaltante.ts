export class GastoFaltanteTable {
    // tslint:disable-next-line: variable-name
    _id: string;
    casa: string;
    importe: number;
}

export class GastoFaltante {
    casas: GastoFaltanteCasas[];
    cuotas: GastoFaltanteImporte[];
}

export class GastoFaltanteCasas {
    usuario: string;
    casa: string;
}

export class GastoFaltanteImporte {
    // tslint:disable-next-line: variable-name
    _id: string;
    casa: string;
    importe: number;
}
