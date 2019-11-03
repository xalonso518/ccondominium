import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioAgregar } from 'src/app/models/usuario/usuarioAgregar';
import { slideInDownAnimation } from 'src/app/utils/constants/animations';
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
import { GastoSimpleView } from 'src/app/models/gasto/gastoSimpleView';
import { GastoService } from '../gastos.service';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { GastoAgregar } from 'src/app/models/gasto/gastoAgregar';
import { FileInput } from 'src/app/models/file/FileInput';
import { ArchivoInput } from 'src/app/models/file/ArchivoInput';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css'],
  providers: [TipoGastoService, ErrorValidationService, ConfigService],
  animations: [slideInDownAnimation]
})
export class AgregarGastoComponent implements OnInit {
  isAgregar = true;
  tipos: TipoGastoAgregar[] = [new TipoGastoAgregar()];
  gasto = new GastoAgregar();
  meses = ConstantsCatalogos.MESES;
  anios = [2018, 2019];
  /*Archivo*/
  archivo: ArchivoInput = new ArchivoInput();
  file: FileInput = new FileInput('', '', '');
  fileExt = ConstantsCatalogos.EXT_FILE;

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private tipoGastoService: TipoGastoService,
    private gastoService: GastoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAgregar: boolean, gastoId: string }) { }

  ngOnInit() {
    this.setAnios();
    if (this.data == null) { this.onNoClick(); } else {
      this.isAgregar = this.data.isAgregar;
      this.buscarTiposGasto();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Get gasto
  getGasto(id: string) {
    this.loadingService.show();
    this.gastoService.getGasto(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) {
              this.gasto = new GastoAgregar();
              this.gasto._id = res.payload._id;
              this.gasto.tipoGasto = res.payload.tipoGasto;
              this.gasto.importe = res.payload.importe;
              this.gasto.mes = res.payload.mes;
              this.gasto.anio = res.payload.anio;
              this.gasto.nota = res.payload.nota;
            } else { this.toastr.error('No se obtuvieron datos de la gasto', 'Error'); }
            }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
            }
        );
  }

  // MES y Anio
  setAnios() {
    const min = 2018;
    const fecha = new Date();
    const max = fecha.getFullYear();
    for (let i = min; i <= max; i++) {
      this.anios.push(i);
    }
  }

  setAnioMesActual() {
    const fecha = new Date();
    this.gasto.anio = fecha.getFullYear();
    const m = this.meses.find(x => x.key === fecha.getMonth());
    this.gasto.mes = m !== undefined ? m.key : 0;
  }

  // TIPOS CUOTA
  buscarTiposGasto(): void {
    this.loadingService.show();
    this.tipoGastoService.getTiposGastos().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tipos = res.payload;
            if (this.isAgregar) {
              this.gasto.tipoGasto = this.tipos[0]._id;
              this.gasto.importe = this.tipos[0].importe;
              this.setAnioMesActual();
            } else {
              // Buscar datos
              this.getGasto(this.data.gastoId);
            }

          } else {
            this.toastr.info('Sin datos', 'Agregue un tipo de gasto');
            this.onNoClick();
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  setImporte() {
    const fTipo = this.tipos.find(t => t._id === this.gasto.tipoGasto);
    this.gasto.importe = fTipo.importe;
  }

  // ARCHIVOS
  getFileInput(file: FileInput) {
    this.archivo.name = file.name;
    this.archivo.size = file.file.size;
    this.archivo.type = file.file.type;
    this.archivo.extension = file.file.name.split('.')[1];

    let reader = new FileReader();
    reader.readAsDataURL(file.file);
    reader.onload = () => {
      const res = reader.result;
      if (typeof res === "string") this.archivo.value = res.split(',')[1];
    };

    this.file = file;
  }

  // ACCIONES
  guardar(form: FormControl) {
    if (form.valid) {
      this.gasto.usuario = this.identityUserService.getUserUser();
      if (this.gasto.nota === undefined) { this.gasto.nota = ''; }
      // Archivo
      if (this.archivo != null && this.archivo.value != null && this.file.file != null) {
        this.agregarFile();
      } else {
        this.agregar();
      }
    } else {
      this.toastr.error('Campos incorrectos o vacios', 'Error');
    }
  }

  agregarFile() {
    this.loadingService.show();
    const formData = new FormData();
    formData.append('file', this.file.file);
    formData.append('anio', this.gasto.anio.toString());
    formData.append('mes', this.gasto.mes.toString());
    formData.append('tipoGasto', this.gasto.tipoGasto);
    formData.append('importe', this.gasto.importe.toString());
    formData.append('nota', this.gasto.nota);
    formData.append('usuario', this.gasto.usuario);

    this.gastoService.postGastoFile(formData)
      .subscribe(
        registro => {
          this.loadingService.hide();
          this.toastr.success('Registro!', 'Datos correctos!');
          this.dialogRef.close(true);
        }, error => {
          this.loadingService.hide();
          this.toastr.error(error);
        }, () => {
          this.loadingService.hide();
        }
      );
  }

  agregar() {
    this.loadingService.show();
    this.gastoService.postGasto(this.gasto)
      .subscribe(
        registro => {
          this.loadingService.hide();
          this.toastr.success('Registro!', 'Datos correctos!');
          this.dialogRef.close(true);
        }, error => {
          this.loadingService.hide();
          this.toastr.error(error);
        }, () => {
          this.loadingService.hide();
        }
      );
  }

  editar(form: FormControl) {
    this.loadingService.show();
    if (form.valid) {
        this.gastoService.putGasto(this.gasto)
            .subscribe(
            registro => {
                this.loadingService.hide();
                this.toastr.success('Registro!', 'Datos correctos!');
                this.dialogRef.close(true);
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
