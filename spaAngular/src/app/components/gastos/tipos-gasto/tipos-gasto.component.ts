import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { TipoGastoService } from '../tipoGasto.service';
import { TipoGastoView } from 'src/app/models/tipoGasto/tipoGastoView';
import { AgregarTipoGastoComponent } from '../agregar-tipo-gasto/agregar-tipo-gasto.component';
import { TipoGastoEstado } from 'src/app/models/tipoGasto/tipoGastoEstado';

@Component({
  selector: 'app-tipos-gasto',
  templateUrl: './tipos-gasto.component.html',
  styleUrls: ['./tipos-gasto.component.css'],
  providers: [TipoGastoService]
})
export class TiposGastoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'proveedor', 'importe', 'estado', 'accion'];
  tipos: TipoGastoView[] = new Array();
  dataSource = new MatTableDataSource(this.tipos);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private identityUserService: IdentityUserService,
    private tiposService: TipoGastoService,
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
    this.tiposService.getTiposGastosTodos().subscribe(
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
    const dialogRef = this.dialog.open(AgregarTipoGastoComponent, {
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : true, tipo: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openEditar(tipo: TipoGastoView): void {
    const dialogRef = this.dialog.open(AgregarTipoGastoComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      disableClose: false, autoFocus: false, width: '750px',  data: {isAgregar : false, tipo: tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  cambiarEstado(tipo: TipoGastoView, estado: number) {
    // tslint:disable-next-line: one-variable-per-declaration
    const nEstado = new TipoGastoEstado();
    nEstado._id = tipo._id;
    nEstado.estado = estado.toString();

    this.loadingService.show();
    this.tiposService.cambioEstadoTipoGasto(nEstado).subscribe(
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
