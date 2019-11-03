import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/app-shared.module';
import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteAnualComponent } from './reporte-anual/reporte-anual.component';
import { GraficaReporteAnualComponent } from './grafica-reporte-anual/grafica-reporte-anual.component';

@NgModule({
    imports: [
        ReporteRoutingModule,
        AppSharedModule,
    ],
    declarations: [
    ReporteAnualComponent,
    GraficaReporteAnualComponent],
    providers: [
    ],
    entryComponents: [
        GraficaReporteAnualComponent
    ]
})

export class ReporteModule {
}
