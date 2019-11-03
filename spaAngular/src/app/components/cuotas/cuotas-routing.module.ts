import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposCuotaComponent } from './tipos-cuota/tipos-cuota.component';
import { CuotasComponent } from './cuotas/cuotas.component';
import { CuotasPendientesComponent } from './cuotas-pendientes/cuotas-pendientes.component';
import { AgregarCuotaTablaComponent } from './agregar-cuota-tabla/agregar-cuota-tabla.component';

const routes: Routes = [
    {
        path: 'lista',
        component: CuotasComponent
    },
    {
        path: 'catalogo',
        component: TiposCuotaComponent
    },
    {
        path: 'faltantes',
        component: CuotasPendientesComponent
    },
    {
        path: 'tabla',
        component: AgregarCuotaTablaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CuotasRoutingModule {
}
