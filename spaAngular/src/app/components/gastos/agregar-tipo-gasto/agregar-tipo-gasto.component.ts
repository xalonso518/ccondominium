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

@Component({
  selector: 'app-agregar-tipo-gasto',
  templateUrl: './agregar-tipo-gasto.component.html',
  styleUrls: ['./agregar-tipo-gasto.component.css'],
  providers: [TipoGastoService, ErrorValidationService, ConfigService ],
  animations: [slideInDownAnimation ]
})
export class AgregarTipoGastoComponent implements OnInit {

  fecha = new FormControl(new Date());
  isAgregar = true;
  tipo = new TipoGastoAgregar();

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private usuarioService: TipoGastoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarTipoGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isAgregar: boolean, tipo: TipoGastoView}) { }

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.isAgregar = this.data.isAgregar;
      if (!this.isAgregar) { this.getTipo(this.data.tipo._id); }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTipo(id: string) {
    this.loadingService.show();
    this.usuarioService.getTipoGasto(id)
        .subscribe(
        res => {
            this.loadingService.hide();
            // tslint:disable-next-line: max-line-length
            if (res.success) { this.tipo = res.payload; } else { this.toastr.error('No se obtuvieron datos del tipo', 'Error'); }
            }, error => {
              this.loadingService.hide();
              this.toastr.error(error);
            }
        );
  }

  guardar(form: FormControl) {
    this.loadingService.show();
    if (form.valid) {
        this.usuarioService.postTipoGasto(this.tipo)
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

  editar(form: FormControl) {
    this.loadingService.show();
    if (form.valid) {
        this.usuarioService.putTipoGasto(this.tipo)
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
