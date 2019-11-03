export class ReporteAnual {
    cuotas: ReporteAnualRow[];
    gastos: ReporteAnualRow[];
}

export class ReporteAnualRow {
    importe: number;
    _id: ReporteAnualElement;
}

export class ReporteAnualElement {
    _id: string;
    mes: number;
}

export class ReporteAnualTableRow {
    constructor() {
        this.importes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    _id: string;
    tipo: string;
    importes: number[];
}

export class ReporteAnualSaldos {
    tipo: string;
    importes: number[];
}
