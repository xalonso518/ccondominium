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
import { TipoCuotaService } from '../tipoCuota.service';
import { TipoCuotaAgregar } from 'src/app/models/tipoCuota/tipoCuotaAgregar';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { CuotaService } from '../cuota.service';
import { CuotaView, CuotaArchivoView } from 'src/app/models/cuota/cuotaView';
import { AgregarCuotaComponent } from '../agregar-cuota/agregar-cuota.component';
import { EnviarMensajeComponent } from '../../usuarios/enviar-mensaje/enviar-mensaje.component';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { CuotaEliminarArchivo } from 'src/app/models/cuota/cuotaEliminarArchivo';
import { AgregarArchivoCuotaComponent } from '../agregar-archivo-cuota/agregar-archivo-cuota.component';

@Component({
  selector: 'app-info-cuota',
  templateUrl: './info-cuota.component.html',
  styleUrls: ['./info-cuota.component.css'],
  providers: [CuotaService, ErrorValidationService, ConfigService ],
  animations: [slideInDownAnimation, listAnimation ]
})

export class InfoCuotaComponent implements OnInit {
  cuota = new CuotaView();
  tipo = '';

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private cuotaService: CuotaService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InfoCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, tipo: string}) { }

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.tipo = this.data.tipo;
      this.getCuota(this.data.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCuota(id: string) {
    this.loadingService.show();
    this.cuotaService.getCuota(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) { this.cuota = res.payload; } else { this.toastr.error('No se obtuvieron datos de la cuota', 'Error'); }
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
    const dialogRef = this.dialog.open(AgregarCuotaComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : false, cuotaId: this.cuota._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.dialogRef.close(true); }
    });
  }

  openEnviarMensaje(): void {
    const dialogRef = this.dialog.open(EnviarMensajeComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {usuario: this.cuota.usuario}
    });
  }

  eliminar() {
    // tslint:disable-next-line: one-variable-per-declaration
    const confirmacion = confirm('Eliminar la cuota');
    if (confirmacion) {
      this.loadingService.show();
      this.cuotaService.deleteCuota(this.cuota._id).subscribe(
      registro => {
          this.loadingService.hide();
          this.toastr.success('', 'Cuota eliminada');
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

  getArchivoUrl(archivo: CuotaArchivoView): string {
    return this.config.getApiURI() + '/' + archivo.url;
  }

  eliminarArchivo(archivo: CuotaArchivoView) {
    // tslint:disable-next-line: one-variable-per-declaration
    const confirmacion = confirm('Eliminar archivo ' + archivo.nombre);
    if (confirmacion) {

      const aEliminar = new CuotaEliminarArchivo();
      aEliminar._id = this.cuota._id;
      aEliminar.archivoId = archivo._id;

      this.loadingService.show();
      this.cuotaService.postCuotaDeleteFile(aEliminar).subscribe(
      registro => {
          this.loadingService.hide();
          this.toastr.success('', 'Archivo eliminado');
          this.eliminarArchivoArreglo(archivo._id);
          }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
          }, () => {
              this.loadingService.hide();
          }
        );
    }
  }

  eliminarArchivoArreglo(id: string) {
    const index = this.cuota.archivos.findIndex(a => {
      return a._id === id;
    });
    const a = this.cuota.archivos.slice(0, index);
    const b = this.cuota.archivos.slice(index + 1, this.cuota.archivos.length);
    this.cuota.archivos = a.concat(b);
  }

  openAgregarArchivo(): void {
    const dialogRef = this.dialog.open(AgregarArchivoCuotaComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: this.cuota._id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.dialogRef.close(true); }
    });
  }

}
