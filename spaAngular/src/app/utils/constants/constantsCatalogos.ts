import { WrapCatalogo } from 'src/app/models/shared/WrapCatalogo';

export class ConstantsCatalogos {
    public static get PERIODOS(): WrapCatalogo[] {
        const a = new Array();
        a.push({ key: '0', value: 'Hoy' });
        a.push({ key: '1', value: 'Ayer' });
        a.push({ key: '2', value: 'Mes actual' });
        a.push({ key: '3', value: 'Mes anterior' });
        a.push({ key: '4', value: 'Bimestre actual' });
        a.push({ key: '5', value: 'Bimestre anterior' });
        a.push({ key: '6', value: 'Año actual' });
        a.push({ key: '7', value: 'Año anterior' });
        a.push({ key: '8', value: 'Desde siempre' });
        a.push({ key: '9', value: 'Personalizado' });
        return a;
    }
}
