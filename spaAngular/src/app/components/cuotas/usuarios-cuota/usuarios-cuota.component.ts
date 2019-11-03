import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UsuarioService } from '../../usuarios/usuario.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { MatTableDataSource } from '@angular/material/table';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatDialog } from '@angular/material';
import { EnviarMensajeComponent } from '../../usuarios/enviar-mensaje/enviar-mensaje.component';

@Component({
  selector: 'app-usuarios-cuota',
  templateUrl: './usuarios-cuota.component.html',
  styleUrls: ['./usuarios-cuota.component.css'],
  providers: [UsuarioService]
})
export class UsuariosCuotaComponent implements OnInit {
  displayedColumns: string[] = ['imagen', 'user', 'nombre', 'telefono', 'accion'];
  usuarios: UsuarioView[] = new Array();
  dataSource = new MatTableDataSource(this.usuarios);
  casa = '';

  constructor(
    private identityUserService: IdentityUserService,
    private usuarioService: UsuarioService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private configService: ConfigService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsuariosCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { casa: string }) { }
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.casa = this.data.casa;
      this.buscar();
    }
  }

  buscar(): void {
    this.loadingService.show();
    this.usuarioService.getUsuariosCasa(this.casa).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.usuarios = res.payload;
            this.dataSource = new MatTableDataSource(res.payload);
            this.dataSource.sort = this.sort;
          } else {
            this.toastr.info('Sin datos', 'Consulta terminada');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  setUrlImagen(usuario: UsuarioView): string {
    return this.configService.getApiURI() + '/' + usuario.imagen;
  }

  openEnviarMensaje(usuario: UsuarioView): void {
    const dialogRef = this.dialog.open(EnviarMensajeComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {usuario: usuario.user}
    });
  }
}
