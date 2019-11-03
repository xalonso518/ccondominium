import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { TipoCuotaService } from '../tipoCuota.service';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { AgregarTipoCuotaComponent } from '../agregar-tipo-cuota/agregar-tipo-cuota.component';
import { TipoCuotaEstado } from 'src/app/models/tipoCuota/tipoCuotaEstado';

@Component({
  selector: 'app-tipos-cuota',
  templateUrl: './tipos-cuota.component.html',
  styleUrls: ['./tipos-cuota.component.css'],
  providers: [TipoCuotaService]
})
export class TiposCuotaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'importe', 'estado', 'accion'];
  tipos: TipoCuotaView[] = new Array();
  dataSource = new MatTableDataSource(this.tipos);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private identityUserService: IdentityUserService,
    private tiposService: TipoCuotaService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private configService: ConfigService,
    public dialog: MatDialog,
) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.startGetDatos();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  startGetDatos() {
      if (!this.identityUserService.getUserId()) {
          setTimeout(() => {
              this.startGetDatos();
          }, 1000);
      } else { this.buscar(); }
  }

  buscar(): void {
    this.loadingService.show();
    this.tiposService.getTiposCuotasTodos().subscribe(
        res => {
          this.loadingService.hide();
          if (res.success) {
            if (res.payload != null && res.payload.length > 0) {
              this.tipos = res.payload;
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

  openAgregar(): void {
    const dialogRef = this.dialog.open(AgregarTipoCuotaComponent, {
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : true, tipo: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openEditar(tipo: TipoCuotaView): void {
    const dialogRef = this.dialog.open(AgregarTipoCuotaComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : false, tipo: tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  cambiarEstado(tipo: TipoCuotaView, estado: number) {
    // tslint:disable-next-line: one-variable-per-declaration
    const nEstado = new TipoCuotaEstado();
    nEstado._id = tipo._id;
    nEstado.estado = estado.toString();

    this.loadingService.show();
    this.tiposService.cambioEstadoTipoCuota(nEstado).subscribe(
    registro => {
        this.loadingService.hide();
        tipo.estado = estado.toString();
        }, error => {
            this.loadingService.hide();
            this.toastr.error(error);
        }, () => {
            this.loadingService.hide();
        }
    );
  }

}
