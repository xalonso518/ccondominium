import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/app-shared.module';
import { GastosRoutingModule } from './gastos-routing.module';
import { EnviarMensajeComponent } from '../usuarios/enviar-mensaje/enviar-mensaje.component';
import { TiposGastoComponent } from './tipos-gasto/tipos-gasto.component';
import { AgregarTipoGastoComponent } from './agregar-tipo-gasto/agregar-tipo-gasto.component';
import { GastosComponent } from './gastos/gastos.component';
import { AgregarGastoComponent } from './agregar-gasto/agregar-gasto.component';
import { InfoGastoComponent } from './info-gasto/info-gasto.component';
import { AgregarArchivoGastoComponent } from './agregar-archivo-gasto/agregar-archivo-gasto.component';
import { GraficaGastoComponent } from './grafica-gastos/grafica-gasto.component';

@NgModule({
    imports: [
        GastosRoutingModule,
        AppSharedModule,
    ],
    declarations: [
        TiposGastoComponent,
        AgregarTipoGastoComponent,
        GastosComponent,
        AgregarGastoComponent,
        InfoGastoComponent,
        AgregarArchivoGastoComponent,
        GraficaGastoComponent
    ],
    providers: [
    ],
    entryComponents: [
        EnviarMensajeComponent,
        AgregarTipoGastoComponent,
        AgregarGastoComponent,
        InfoGastoComponent,
        AgregarArchivoGastoComponent,
        GraficaGastoComponent
    ]
})

export class GastosModule {
}
