import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { slideInDownAnimation } from 'src/app/utils/constants/animations';
import { ErrorValidationService } from 'src/app/utils/service/error-validation.service';
import { ConfigService } from 'src/app/utils/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CondominioService } from '../condominio.service';
import { AvisoAgregar } from 'src/app/models/condominio/avisoAgregar';
@Component({
  selector: 'app-agregar-aviso',
  templateUrl: './agregar-aviso.component.html',
  styleUrls: ['./agregar-aviso.component.css'],
  providers: [CondominioService ],
  animations: [slideInDownAnimation ]
})
export class AgregarAvisoComponent implements OnInit {
  aviso = new AvisoAgregar();
  sMensaje = '';
  IsCorreo = false;

  constructor(
    private toastr: ToastrService,
    private condominioService: CondominioService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarAvisoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.aviso.admin = this.identityUserService.getUserUser();
      this.aviso.correo = false;
      this.aviso.mensaje = '';
      this.aviso.prioridad = 'medio';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(form: FormControl) {
    this.aviso.mensaje = this.sMensaje;
    this.aviso.correo = this.IsCorreo;
    this.loadingService.show();
    if (form.valid) {
        this.condominioService.postAviso(this.aviso)
            .subscribe(
            registro => {
                this.loadingService.hide();
                this.toastr.success('Aviso enviado', 'Datos correctos!');
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
