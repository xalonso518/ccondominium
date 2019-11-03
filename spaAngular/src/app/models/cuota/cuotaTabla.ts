export class CuotaTabla {
    casa: string;
    tipoCuota: string;
    nombreCuota: string;
    cuota: CuotaTablaElemento;
}

export class CuotaTablaElemento {
    m0: CuotaTablaImporte;
    m1: CuotaTablaImporte;
    m2: CuotaTablaImporte;
    m3: CuotaTablaImporte;
    m4: CuotaTablaImporte;
    m5: CuotaTablaImporte;
    m6: CuotaTablaImporte;
    m7: CuotaTablaImporte;
    m8: CuotaTablaImporte;
    m9: CuotaTablaImporte;
    m10: CuotaTablaImporte;
    m11: CuotaTablaImporte;
    total: number;
}

export class CuotaTablaImporte {
    // tslint:disable-next-line: variable-name
    _id: string;
    importe: number;
}
