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
import { TipoCumplimientoView } from 'src/app/models/tipoCumplimiento/tipoCumplimientoView';

@Component({
  selector: 'app-agregar-tipo-cumplimiento',
  templateUrl: './agregar-tipo-cumplimiento.component.html',
  styleUrls: ['./agregar-tipo-cumplimiento.component.css'],
  providers: [TipoCumplimientoService, ErrorValidationService, ConfigService ],
  animations: [slideInDownAnimation ]
})
export class AgregarTipoCumplimientoComponent implements OnInit {

  fecha = new FormControl(new Date());
  isAgregar = true;
  tipo = new TipoCumplimientoAgregar();

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private usuarioService: TipoCumplimientoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarTipoCumplimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isAgregar: boolean, tipo: TipoCumplimientoView}) { }

  ngOnInit() {
    this.tipo.nivel = 'medio';
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
    this.usuarioService.getTipoCumplimiento(id)
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
        this.usuarioService.postTipoCumplimiento(this.tipo)
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
        this.usuarioService.putTipoCumplimiento(this.tipo)
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
