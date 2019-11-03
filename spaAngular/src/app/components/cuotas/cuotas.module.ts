import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/app-shared.module';
import { CuotasRoutingModule } from './cuotas-routing.module';
import { EnviarMensajeComponent } from '../usuarios/enviar-mensaje/enviar-mensaje.component';
import { TiposCuotaComponent } from './tipos-cuota/tipos-cuota.component';
import { AgregarTipoCuotaComponent } from './agregar-tipo-cuota/agregar-tipo-cuota.component';
import { CuotasComponent } from './cuotas/cuotas.component';
import { AgregarCuotaComponent } from './agregar-cuota/agregar-cuota.component';
import { InfoCuotaComponent } from './info-cuota/info-cuota.component';
import { AgregarArchivoCuotaComponent } from './agregar-archivo-cuota/agregar-archivo-cuota.component';
import { GraficaCuotaComponent } from './grafica-cuota/grafica-cuota.component';
import { CuotasPendientesComponent } from './cuotas-pendientes/cuotas-pendientes.component';
import { AgregarCuotaTablaComponent } from './agregar-cuota-tabla/agregar-cuota-tabla.component';
import { UsuariosCuotaComponent } from './usuarios-cuota/usuarios-cuota.component';

@NgModule({
    imports: [
        CuotasRoutingModule,
        AppSharedModule,
    ],
    declarations: [
        TiposCuotaComponent,
        AgregarTipoCuotaComponent,
        CuotasComponent,
        AgregarCuotaComponent,
        InfoCuotaComponent,
        AgregarArchivoCuotaComponent,
        GraficaCuotaComponent,
        CuotasPendientesComponent,
        AgregarCuotaTablaComponent,
        UsuariosCuotaComponent
    ],
    providers: [
    ],
    entryComponents: [
        EnviarMensajeComponent,
        AgregarTipoCuotaComponent,
        AgregarCuotaComponent,
        InfoCuotaComponent,
        AgregarArchivoCuotaComponent,
        GraficaCuotaComponent,
        UsuariosCuotaComponent
    ]
})

export class CuotasModule {
}
