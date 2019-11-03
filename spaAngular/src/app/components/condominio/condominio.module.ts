import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/app-shared.module';
import { EnviarMensajeComponent } from '../usuarios/enviar-mensaje/enviar-mensaje.component';
import { CondominioRoutingModule } from './condominio-routing.module';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AvisosComponent } from './avisos/avisos.component';
import { AgregarAvisoComponent } from './agregar-aviso/agregar-aviso.component';

@NgModule({
    imports: [
        CondominioRoutingModule,
        AppSharedModule,
    ],
    declarations: [
        BitacoraComponent,
        ConfiguracionComponent,
        MensajesComponent,
        AvisosComponent,
        AgregarAvisoComponent
    ],
    providers: [
    ],
    entryComponents: [
        AgregarAvisoComponent
    ]
})

export class CondominioModule {
}
