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

@Component({
  selector: 'app-agregar-tipo-cuota',
  templateUrl: './agregar-tipo-cuota.component.html',
  styleUrls: ['./agregar-tipo-cuota.component.css'],
  providers: [TipoCuotaService, ErrorValidationService, ConfigService ],
  animations: [slideInDownAnimation ]
})
export class AgregarTipoCuotaComponent implements OnInit {

  fecha = new FormControl(new Date());
  isAgregar = true;
  tipo = new TipoCuotaAgregar();

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private usuarioService: TipoCuotaService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarTipoCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isAgregar: boolean, tipo: TipoCuotaView}) { }

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
    this.usuarioService.getTipoCuota(id)
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
        this.usuarioService.postTipoCuota(this.tipo)
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
        this.usuarioService.putTipoCuota(this.tipo)
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
