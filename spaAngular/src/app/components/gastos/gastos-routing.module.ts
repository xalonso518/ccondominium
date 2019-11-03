import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposGastoComponent } from './tipos-gasto/tipos-gasto.component';
import { GastosComponent } from './gastos/gastos.component';

const routes: Routes = [
    {
        path: 'lista',
        component: GastosComponent
    },
    {
        path: 'catalogo',
        component: TiposGastoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GastosRoutingModule {
}
