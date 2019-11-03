import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AvisosComponent } from './avisos/avisos.component';
import { MensajesComponent } from './mensajes/mensajes.component';

const routes: Routes = [
    {
        path: 'bitacora',
        component: BitacoraComponent
    },
    {
        path: 'configuracion',
        component: ConfiguracionComponent
    },
    {
        path: 'mensajes',
        component: MensajesComponent
    },
    {
        path: 'avisos',
        component: AvisosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CondominioRoutingModule {
}
