import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioAgregar } from 'src/app/models/usuario/usuarioAgregar';
import { slideInDownAnimation, listAnimation } from 'src/app/utils/constants/animations';
import { ErrorValidationService } from 'src/app/utils/service/error-validation.service';
import { ConfigService } from 'src/app/utils/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { TipoCumplimientoService } from '../tipoCumplimiento.service';
import { TipoCumplimientoAgregar } from 'src/app/models/tipoCumplimiento/tipoCumplimientoAgregar';
import { TipoCumplimientoView } from 'src/app/models/tipoCumplimiento/tipoCumplimientoView';
import { CumplimientoService } from '../cumplimiento.service';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { CumplimientoView } from 'src/app/models/cumplimiento/cumplimientoView';
import { AgregarCumplimientoComponent } from '../agregar-cumplimiento/agregar-cumplimiento.component';
import { EnviarMensajeComponent } from '../../usuarios/enviar-mensaje/enviar-mensaje.component';

@Component({
  selector: 'app-info-cumplimiento',
  templateUrl: './info-cumplimiento.component.html',
  styleUrls: ['./info-cumplimiento.component.css'],
  providers: [CumplimientoService, ErrorValidationService, ConfigService ],
  animations: [slideInDownAnimation, listAnimation ]
})

export class InfoCumplimientoComponent implements OnInit {
  cumplimiento = new CumplimientoView();
  tipo = '';

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private cumplimientoService: CumplimientoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InfoCumplimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, tipo: string}) { }

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.tipo = this.data.tipo;
      this.getCumplimiento(this.data.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCumplimiento(id: string) {
    this.loadingService.show();
    this.cumplimientoService.getCumplimiento(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) { this.cumplimiento = res.payload; } else { this.toastr.error('No se obtuvieron datos de la cumplimiento', 'Error'); }
            }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
            }
        );
  }

  getMes(mes: number): string {
    return ConstantsCatalogos.getMes(mes);
  }

  openEditar(): void {
    const dialogRef = this.dialog.open(AgregarCumplimientoComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : false, cumplimientoId: this.cumplimiento._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.dialogRef.close(true); }
    });
  }

  openEnviarMensaje(): void {
    const dialogRef = this.dialog.open(EnviarMensajeComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {usuario: this.cumplimiento.usuario}
    });
  }

  eliminar() {
    // tslint:disable-next-line: one-variable-per-declaration
    const confirmacion = confirm('Eliminar la cumplimiento');
    if (confirmacion) {
      this.loadingService.show();
      this.cumplimientoService.deleteCumplimiento(this.cumplimiento._id).subscribe(
      registro => {
          this.loadingService.hide();
          this.toastr.success('', 'Cumplimiento eliminada');
          this.dialogRef.close(true);
          }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
          }, () => {
              this.loadingService.hide();
          }
        );
    }
  }

}
