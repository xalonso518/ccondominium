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
import { TipoCuotaService } from '../tipoCuota.service';
import { TipoCuotaAgregar } from 'src/app/models/tipoCuota/tipoCuotaAgregar';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { CuotaSimpleView } from 'src/app/models/cuota/cuotaSimpleView';
import { CuotaService } from '../cuota.service';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { CuotaAgregar } from 'src/app/models/cuota/cuotaAgregar';
import { FileInput } from 'src/app/models/file/FileInput';
import { ArchivoInput } from 'src/app/models/file/ArchivoInput';

@Component({
  selector: 'app-agregar-cuota',
  templateUrl: './agregar-cuota.component.html',
  styleUrls: ['./agregar-cuota.component.css'],
  providers: [TipoCuotaService, ErrorValidationService, ConfigService],
  animations: [slideInDownAnimation]
})
export class AgregarCuotaComponent implements OnInit {
  isAgregar = true;
  tipos: TipoCuotaAgregar[] = [new TipoCuotaAgregar()];
  cuota = new CuotaAgregar();
  meses = ConstantsCatalogos.MESES;
  anios = [2018, 2019];
  /*Archivo*/
  archivo: ArchivoInput = new ArchivoInput();
  file: FileInput = new FileInput('', '', '');
  fileExt = ConstantsCatalogos.EXT_FILE;

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private tipoCuotaService: TipoCuotaService,
    private cuotaService: CuotaService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAgregar: boolean, cuotaId: string }) { }

  ngOnInit() {
    this.setAnios();
    if (this.data == null) { this.onNoClick(); } else {
      this.isAgregar = this.data.isAgregar;
      this.buscarTiposCuota();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Get cuota
  getCuota(id: string) {
    this.loadingService.show();
    this.cuotaService.getCuota(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) {
              this.cuota = new CuotaAgregar();
              this.cuota._id = res.payload._id;
              this.cuota.casa = res.payload.casa;
              this.cuota.tipoCuota = res.payload.tipoCuota;
              this.cuota.importe = res.payload.importe;
              this.cuota.mes = res.payload.mes;
              this.cuota.anio = res.payload.anio;
              this.cuota.nota = res.payload.nota;
            } else { this.toastr.error('No se obtuvieron datos de la cuota', 'Error'); }
            }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
            }
        );
  }

  // CASA
  setCasa() {
    if (this.identityUserService.getUserTipo() !== 'admin') {
      this.cuota.casa = this.identityUserService.getDatosUser().casa;
    }
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
    this.cuota.anio = fecha.getFullYear();
    const m = this.meses.find(x => x.key === fecha.getMonth());
    this.cuota.mes = m !== undefined ? m.key : 0;
  }

  // TIPOS CUOTA
  buscarTiposCuota(): void {
    this.loadingService.show();
    this.tipoCuotaService.getTiposCuotas().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tipos = res.payload;
            if (this.isAgregar) {
              this.cuota.tipoCuota = this.tipos[0]._id;
              this.cuota.importe = this.tipos[0].importe;
              this.setAnioMesActual();
              this.setCasa();
            } else {
              // Buscar datos
              this.getCuota(this.data.cuotaId);
            }

          } else {
            this.toastr.info('Sin datos', 'Agregue un tipo de cuota');
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
    const fTipo = this.tipos.find(t => t._id === this.cuota.tipoCuota);
    this.cuota.importe = fTipo.importe;
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
      this.cuota.usuario = this.identityUserService.getUserUser();
      if (this.cuota.nota === undefined) { this.cuota.nota = ''; }
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
    formData.append('casa', this.cuota.casa.toString());
    formData.append('anio', this.cuota.anio.toString());
    formData.append('mes', this.cuota.mes.toString());
    formData.append('tipoCuota', this.cuota.tipoCuota);
    formData.append('importe', this.cuota.importe.toString());
    formData.append('nota', this.cuota.nota);
    formData.append('usuario', this.cuota.usuario);

    this.cuotaService.postCuotaFile(formData)
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
    this.cuotaService.postCuota(this.cuota)
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
        this.cuotaService.putCuota(this.cuota)
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
