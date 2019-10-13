import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionService } from '../../../../utils/service/session.service';
import { NavBarUsuarioService } from '../../../../utils/service/nav-bar-usuario.service';
import { IdentityUserService } from '../../../../utils/IdentityUser/identity-user.service';
import { IdentityUser } from '../../../../utils/IdentityUser/IdentityUser';
import { DatosUsuario } from '../../../../models/usuario/datosUsuario';
import { PerfilUsuarioComponent } from '../../../../components/perfil/perfil-usuario.component';
import { ConfigCondominio } from 'src/app/models/configuracion/configCondominio';

@Component({
  selector: 'app-navbar-panel',
  templateUrl: './navbar-panel.component.html',
  styleUrls: ['./navbar-panel.component.css']
})
export class NavbarPanelComponent implements OnInit {
    iUser: IdentityUser;
    dUser: DatosUsuario = new DatosUsuario('', '', '');
    configCondominio: ConfigCondominio = new ConfigCondominio();

    /** navbar.admin ctor */
    constructor(
        private sessionService: SessionService,
        private identityUser: IdentityUserService,
        private navBarUsuarioService: NavBarUsuarioService,
        public dialog: MatDialog,
    ) {

    }

    logout() {
        this.sessionService.logout();
    }

    ngOnInit(): void {
        this.iUser = this.identityUser.getIdentityUser();
        if (this.identityUser.getDatosUser() == null || this.identityUser.getDatosUser().nombre === 'NA')  {
            this.setDataUser();
            this.setConfig();
          } else {
              this.dUser = this.identityUser.getDatosUser();
              this.configCondominio = this.identityUser.getConfig();
          }
      }

    setDataUser() {
        this.identityUser.getApiDataUser(this.identityUser.getUserUser()).subscribe(
            user => {
                if (user.success) {
                    this.identityUser.createDatosUser(user.payload);
                    this.dUser = user.payload;
                } else  {alert('Error al cargar los datos de usuario');
   }          }
            , error => {
                alert('Error al cargar los datos de usuario');
            }
        );
    }

    setConfig() {
      this.identityUser.getApiConfigCondominio(this.identityUser.getUserUser()).subscribe(
          config => {
              if (config.success) {
                  this.identityUser.createConfig(config.payload);
                  this.configCondominio = config.payload;
              } else  {alert('Error al cargar los datos config'); }
          }, error => {
              alert('Error al cargar los datos config');
          }
      );
  }

    openPerfil(): void {
        const dialogRef = this.dialog.open(PerfilUsuarioComponent, {
            disableClose: false, width: '750px', autoFocus: false, data: {}
        });
    }

  }
