import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteAnualComponent } from './reporte-anual/reporte-anual.component';

const routes: Routes = [
    {
        path: '',
        component: ReporteAnualComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteRoutingModule {
}
