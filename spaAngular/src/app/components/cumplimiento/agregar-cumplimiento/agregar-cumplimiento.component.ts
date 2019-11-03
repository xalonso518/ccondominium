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
import { TipoCumplimientoService } from '../tipoCumplimiento.service';
import { TipoCumplimientoAgregar } from 'src/app/models/tipoCumplimiento/tipoCumplimientoAgregar';
import { CumplimientoService } from '../cumplimiento.service';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { FileInput } from 'src/app/models/file/FileInput';
import { ArchivoInput } from 'src/app/models/file/ArchivoInput';
import { CumplimientoAgregar } from 'src/app/models/cumplimiento/cumplimientoAgregar';

@Component({
  selector: 'app-agregar-cumplimiento',
  templateUrl: './agregar-cumplimiento.component.html',
  styleUrls: ['./agregar-cumplimiento.component.css'],
  providers: [TipoCumplimientoService, ErrorValidationService, ConfigService],
  animations: [slideInDownAnimation]
})
export class AgregarCumplimientoComponent implements OnInit {
  isAgregar = true;
  tipos: TipoCumplimientoAgregar[] = [new TipoCumplimientoAgregar()];
  cumplimiento = new CumplimientoAgregar();
  meses = ConstantsCatalogos.MESES;
  anios = [2018, 2019];

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private tipoCumplimientoService: TipoCumplimientoService,
    private cumplimientoService: CumplimientoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarCumplimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAgregar: boolean, cumplimientoId: string }) { }

  ngOnInit() {
    this.setAnios();
    if (this.data == null) { this.onNoClick(); } else {
      this.isAgregar = this.data.isAgregar;
      this.buscarTiposCumplimiento();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Get cumplimiento
  getCumplimiento(id: string) {
    this.loadingService.show();
    this.cumplimientoService.getCumplimiento(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) {
              this.cumplimiento = new CumplimientoAgregar();
              this.cumplimiento._id = res.payload._id;
              this.cumplimiento.casa = res.payload.casa;
              this.cumplimiento.tipoCumplimiento = res.payload.tipoCumplimiento;
              this.cumplimiento.importe = res.payload.importe;
              this.cumplimiento.mes = res.payload.mes;
              this.cumplimiento.anio = res.payload.anio;
              this.cumplimiento.nivel = res.payload.nivel;
              this.cumplimiento.nota = res.payload.nota;
            } else { this.toastr.error('No se obtuvieron datos de la cumplimiento', 'Error'); }
            }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
            }
        );
  }

  // CASA
  setCasa() {
    if (this.identityUserService.getUserTipo() !== 'admin') {
      this.cumplimiento.casa = this.identityUserService.getDatosUser().casa;
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
    this.cumplimiento.anio = fecha.getFullYear();
    const m = this.meses.find(x => x.key === fecha.getMonth());
    this.cumplimiento.mes = m !== undefined ? m.key : 0;
  }

  // TIPOS CUOTA
  buscarTiposCumplimiento(): void {
    this.loadingService.show();
    this.tipoCumplimientoService.getTiposCumplimientos().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tipos = res.payload;
            if (this.isAgregar) {
              this.cumplimiento.tipoCumplimiento = this.tipos[0]._id;
              this.cumplimiento.importe = this.tipos[0].importe;
              this.setAnioMesActual();
              this.setCasa();
            } else {
              // Buscar datos
              this.getCumplimiento(this.data.cumplimientoId);
            }

          } else {
            this.toastr.info('Sin datos', 'Agregue un tipo de cumplimiento');
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
    const fTipo = this.tipos.find(t => t._id === this.cumplimiento.tipoCumplimiento);
    this.cumplimiento.importe = fTipo.importe;
    this.cumplimiento.nivel = fTipo.nivel;
  }

  // ACCIONES
  guardar(form: FormControl) {
    if (form.valid) {
      this.cumplimiento.usuario = this.identityUserService.getUserUser();
      this.agregar();
    } else {
      this.toastr.error('Campos incorrectos o vacios', 'Error');
    }
  }
  
  agregar() {
    this.loadingService.show();
    this.cumplimientoService.postCumplimiento(this.cumplimiento)
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
        this.cumplimientoService.putCumplimiento(this.cumplimiento)
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
