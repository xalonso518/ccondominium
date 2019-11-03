export class GastoTabla {
    casa: string;
    tipoGasto: string;
    nombreGasto: string;
    cuota: GastoTablaElemento;
}

export class GastoTablaElemento {
    m0: GastoTablaImporte;
    m1: GastoTablaImporte;
    m2: GastoTablaImporte;
    m3: GastoTablaImporte;
    m4: GastoTablaImporte;
    m5: GastoTablaImporte;
    m6: GastoTablaImporte;
    m7: GastoTablaImporte;
    m8: GastoTablaImporte;
    m9: GastoTablaImporte;
    m10: GastoTablaImporte;
    m11: GastoTablaImporte;
    total: number;
}

export class GastoTablaImporte {
    // tslint:disable-next-line: variable-name
    _id: string;
    importe: number;
}
