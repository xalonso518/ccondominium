import { Component, OnInit } from '@angular/core';
import { CondominioService } from '../condominio.service';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ConfigCondominio } from 'src/app/models/configuracion/configCondominio';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  providers: [CondominioService],
})
export class ConfiguracionComponent implements OnInit {
config = new ConfigCondominio();

  constructor(
    private identityUserService: IdentityUserService,
    private condominioService: CondominioService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.startGetDatos();
  }

  startGetDatos() {
    if (!this.identityUserService.getUserId()) {
      setTimeout(() => {
        this.startGetDatos();
      }, 1000);
    } else {
      this.buscar();
    }
  }

  buscar(): void {
    this.loadingService.show();
    this.identityUserService.getApiConfigCondominio(this.identityUserService.getUserUser()).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null) {
            this.config = res.payload;
          } else {
            this.toastr.info('Sin datos', 'Consulta terminada');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  editar(form: FormControl) {
    this.loadingService.show();
    if (form.valid) {
        this.condominioService.putConfig(this.config)
            .subscribe(
            registro => {
                this.loadingService.hide();
                this.toastr.success('Registro!', 'Datos correctos!');
                }, error => {
                    this.loadingService.hide();
                    this.toastr.error(error);
                }, () => {
                    this.loadingService.hide();
                }
            );
    } else {
        this.toastr.error('Campos incorrectos o vacios', 'Error');
    }
  }
}
