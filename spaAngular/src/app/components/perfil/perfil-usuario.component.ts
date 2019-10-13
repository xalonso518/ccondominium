import { Component, HostBinding, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilUser } from '../../models/usuario/PerfilUser';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { slideInDownAnimation } from '../../utils/constants/animations';
import { LoadingService } from '../loading/loading.service';
import { ErrorValidationService } from '../../utils/service/error-validation.service';
import { IdentityUserService } from '../../utils/IdentityUser/identity-user.service';
import { ConfigService } from 'src/app/utils/service/config.service';

@Component({
    selector: 'app-perfil-usuario',
    templateUrl: './perfil-usuario.component.html',
    styleUrls: ['./perfil-usuario.component.css'],
    providers: [PerfilUsuarioService, ErrorValidationService, ConfigService ],
    animations: [slideInDownAnimation ]
})

// tslint:disable-next-line: jsdoc-format
/** perfilUsuario component*/
export class PerfilUsuarioComponent implements OnInit {
    submitted = false;
    perfilUser: PerfilUser = {
        nombre : '',
        telefono: '',
        tipo: '',
        casa: '',
        pass: '',
        passConfirm: ''
    };
    resetFile = false;
    details: string;
    sending = false;

    showChangePassword = false;
    hide = true;
    showModal = true;
    img = '';

    constructor(
        private router: Router,
        private config: ConfigService,
        private toastr: ToastrService,
        private perfilUsuarioService: PerfilUsuarioService,
        private identityUserService: IdentityUserService,
        private loadingService: LoadingService,
        private errorValidationService: ErrorValidationService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<PerfilUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.getPerfilUser();
        this.img = this.identityUserService.getDatosUser().imagen;
    }

    send() {
        this.sending = true;
        this.details = 'Sending Message...';

        setTimeout(() => {
            this.sending = false;
            this.closePopup();
        }, 11000);
    }

    onChange(event: any) {
        const files = event.srcElement.files;
        if (this.errorValidationService.validateFileImg(files[0])) {
            this.loadingService.show();
            const f: FormData = new FormData();
            f.append('file', files[0]);
            this.perfilUsuarioService.uploadFileProfile(f, 'perfil', this.identityUserService.getUserId()).subscribe(
                img => {
                    this.loadingService.hide();
                    this.toastr.success('Imagen de perfil cambiada!', 'Archivo subido');
                    this.img = this.config.getApiURI() + '/' + img.payload;
                    this.identityUserService.setImagePerfil(img.payload);
                },
                error => {
                  this.loadingService.hide();
                  this.toastr.error(error, 'Error');
                }
            );
        } else {
            this.toastr.error('Archivo no cumple con el tamaño o extensión requerida', 'Error');
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.closePopup();
    }

    closePopup() {
        this.showModal = !this.showModal;
        setTimeout(() => {
            this.router.navigate([{ outlets: { modal: null } }]);
        }, 200);
    }

    onSubmit(form: FormControl) {
        // console.log("se envio");
    }

    guardar(form: FormControl) {
        this.submitted = true;
        this.loadingService.show();
        if (form.valid && form.value.pass === form.value.passConfirm) {
            this.perfilUsuarioService.uploadProfile(this.identityUserService.getUserId(), this.perfilUser)
                .subscribe(
                registro => {
                    this.loadingService.hide();
                    this.identityUserService.setNombre(this.perfilUser.nombre);
                    this.identityUserService.setCasa(this.perfilUser.casa);
                    this.toastr.success('Registro!', 'Datos correctos!');
                    this.dialogRef.close();
                    }, error => {
                        this.loadingService.hide();
                        this.toastr.error(error, 'Error');
                        this.submitted = false;
                    }, () => {
                        this.loadingService.hide();
                        this.submitted = false;
                    }
                );
        } else {
            this.toastr.error('Campos incorrectos o vacios', 'Error');
            this.submitted = false;
        }
    }

    getPerfilUser() {
        this.perfilUsuarioService.getProfile(this.identityUserService.getUserId())
            .subscribe(
            res => {
                // tslint:disable-next-line: max-line-length
                if (res.success) { this.perfilUser = res.payload; } else { this.toastr.error('No se obtuvieron datos del usuario', 'Error'); }
                }, error => {
                    this.toastr.error(error, 'Error');
                }
            );
    }

    togglePassword() {

    }

}
