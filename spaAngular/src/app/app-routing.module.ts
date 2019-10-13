import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleLayoutComponent } from './containers/single-layout/single-layout.component';
import { AdminLayoutComponent } from './containers/admin-layout/admin-layout.component';
import { AuthGuard } from './utils/service/auth-guard.service';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PanelLayoutComponent } from './containers/panel-layout/panel-layout.component';
import { PanelUserComponent } from './components/panel-user/panel-user.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: '',
    component: SingleLayoutComponent,
    children: [
        { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule' }
    ]
  },
  {
      path: 'admin',
      component: AdminLayoutComponent,
      canActivate: [AuthGuard],
      children: [
          { path: '', component: PanelAdminComponent },
          { path: 'panel', component: PanelAdminComponent },
          { path: 'usuarios', loadChildren: './components/usuarios/usuarios.module#UsuariosModule' }
      ]
  },
  {
      path: 'condominio',
      component: PanelLayoutComponent,
      canActivate: [AuthGuard],
      children: [
          { path: '', component: PanelUserComponent },
          { path: 'panel', component: PanelUserComponent },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
