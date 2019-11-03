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
import { TipoGastoService } from '../tipoGasto.service';
import { TipoGastoAgregar } from 'src/app/models/tipoGasto/tipoGastoAgregar';
import { TipoGastoView } from 'src/app/models/tipoGasto/tipoGastoView';
import { GastoService } from '../gastos.service';
import { GastoView, GastoArchivoView } from 'src/app/models/gasto/gastoView';
import { AgregarGastoComponent } from '../agregar-gasto/agregar-gasto.component';
import { EnviarMensajeComponent } from '../../usuarios/enviar-mensaje/enviar-mensaje.component';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { GastoEliminarArchivo } from 'src/app/models/gasto/gastoEliminarArchivo';
import { AgregarArchivoGastoComponent } from '../agregar-archivo-gasto/agregar-archivo-gasto.component';

@Component({
  selector: 'app-info-gasto',
  templateUrl: './info-gasto.component.html',
  styleUrls: ['./info-gasto.component.css'],
  providers: [GastoService, ErrorValidationService, ConfigService ],
  animations: [slideInDownAnimation, listAnimation ]
})

export class InfoGastoComponent implements OnInit {
  gasto = new GastoView();
  tipo = '';

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private gastoService: GastoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InfoGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, tipo: string}) { }

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.tipo = this.data.tipo;
      this.getGasto(this.data.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getGasto(id: string) {
    this.loadingService.show();
    this.gastoService.getGasto(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) { this.gasto = res.payload; } else { this.toastr.error('No se obtuvieron datos de la gasto', 'Error'); }
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
    const dialogRef = this.dialog.open(AgregarGastoComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : false, gastoId: this.gasto._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.dialogRef.close(true); }
    });
  }

  eliminar() {
    // tslint:disable-next-line: one-variable-per-declaration
    const confirmacion = confirm('Eliminar la gasto');
    if (confirmacion) {
      this.loadingService.show();
      this.gastoService.deleteGasto(this.gasto._id).subscribe(
      registro => {
          this.loadingService.hide();
          this.toastr.success('', 'Gasto eliminada');
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

  getArchivoUrl(archivo: GastoArchivoView): string {
    return this.config.getApiURI() + '/' + archivo.url;
  }

  eliminarArchivo(archivo: GastoArchivoView) {
    // tslint:disable-next-line: one-variable-per-declaration
    const confirmacion = confirm('Eliminar archivo ' + archivo.nombre);
    if (confirmacion) {

      const aEliminar = new GastoEliminarArchivo();
      aEliminar._id = this.gasto._id;
      aEliminar.archivoId = archivo._id;

      this.loadingService.show();
      this.gastoService.postGastoDeleteFile(aEliminar).subscribe(
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
    const index = this.gasto.archivos.findIndex(a => {
      return a._id === id;
    });
    const a = this.gasto.archivos.slice(0, index);
    const b = this.gasto.archivos.slice(index + 1, this.gasto.archivos.length);
    this.gasto.archivos = a.concat(b);
  }

  openAgregarArchivo(): void {
    const dialogRef = this.dialog.open(AgregarArchivoGastoComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: this.gasto._id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.dialogRef.close(true); }
    });
  }

}
