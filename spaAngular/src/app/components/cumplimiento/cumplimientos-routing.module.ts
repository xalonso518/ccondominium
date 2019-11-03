import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CumplimientosComponent } from './cumplimientos/cumplimientos.component';
import { TiposCumplimientoComponent } from './tipos-cumplimiento/tipos-cumplimiento.component';

const routes: Routes = [
    {
        path: 'lista',
        component: CumplimientosComponent
    },
    {
        path: 'catalogo',
        component: TiposCumplimientoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CumplimientosRoutingModule {
}
