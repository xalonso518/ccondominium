import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/app-shared.module';
import { CumplimientosRoutingModule } from './cumplimientos-routing.module';
import { EnviarMensajeComponent } from '../usuarios/enviar-mensaje/enviar-mensaje.component';
import { TiposCumplimientoComponent } from './tipos-cumplimiento/tipos-cumplimiento.component';
import { AgregarTipoCumplimientoComponent } from './agregar-tipo-cumplimiento/agregar-tipo-cumplimiento.component';
import { CumplimientosComponent } from './cumplimientos/cumplimientos.component';
import { AgregarCumplimientoComponent } from './agregar-cumplimiento/agregar-cumplimiento.component';
import { InfoCumplimientoComponent } from './info-cumplimiento/info-cumplimiento.component';
@NgModule({
    imports: [
        CumplimientosRoutingModule,
        AppSharedModule,
    ],
    declarations: [
        TiposCumplimientoComponent,
        AgregarTipoCumplimientoComponent,
        CumplimientosComponent,
        AgregarCumplimientoComponent,
        InfoCumplimientoComponent
    ],
    providers: [
    ],
    entryComponents: [
        EnviarMensajeComponent,
        AgregarTipoCumplimientoComponent,
        AgregarCumplimientoComponent,
        InfoCumplimientoComponent
    ]
})

export class CumplimientoModule {
}
