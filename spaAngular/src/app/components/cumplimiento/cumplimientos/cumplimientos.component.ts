import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { CumplimientoService } from '../cumplimiento.service';
import { TipoCumplimientoView } from 'src/app/models/tipoCumplimiento/tipoCumplimientoView';
import { FormControl } from '@angular/forms';
import { TipoCumplimientoService } from '../tipoCumplimiento.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CumplimientoSimpleView } from 'src/app/models/cumplimiento/cumplimientoSimpleView';
import { AgregarCumplimientoComponent } from '../agregar-cumplimiento/agregar-cumplimiento.component';
import { InfoCumplimientoComponent } from '../info-cumplimiento/info-cumplimiento.component';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';

@Component({
  selector: 'app-cumplimientos',
  templateUrl: './cumplimientos.component.html',
  styleUrls: ['./cumplimientos.component.css'],
  providers: [TipoCumplimientoService, CumplimientoService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CumplimientosComponent implements OnInit {
  tImporte = 0;
  cumplimientos: CumplimientoSimpleView[] = new Array();
  periodo = 'm';
  anios = [2018, 2019];
  anioSeleccionado = 2019;
  mesSeleccionado = 0;
  meses = ConstantsCatalogos.MESES;
  tipos: TipoCumplimientoView[] = [new TipoCumplimientoView()];
  tipo: string;

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['casa', 'tipo', 'importe', 'nivel'];
  dataSource = new MatTableDataSource(this.cumplimientos);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private identityUserService: IdentityUserService,
    private cumplimientosService: CumplimientoService,
    private tipoCumplimientoService: TipoCumplimientoService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private configService: ConfigService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setAnios();
    this.startGetDatos();
  }

  startGetDatos() {
    if (!this.identityUserService.getUserId()) {
      setTimeout(() => {
        this.startGetDatos();
      }, 1000);
    } else {
      this.buscarTiposCumplimiento();
    }
  }

  buscar(): void {
    // Validar datos
    this.validarBusqueda();

    this.loadingService.show();
    this.cumplimientosService.getCumplimientos(this.anioSeleccionado, this.mesSeleccionado, this.tipo).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.cumplimientos = res.payload;
            this.dataSource = new MatTableDataSource(this.cumplimientos);
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

  validarBusqueda(): boolean {
    if (this.anioSeleccionado === undefined || this.anioSeleccionado === 0) {
      this.toastr.info('Año sin seleccionar', 'Faltan datos');
      return false;
    }
    if (this.mesSeleccionado === undefined || this.mesSeleccionado === null) {
      this.toastr.info('Periodo sin seleccionar', 'Faltan datos');
      return false;
    }
    if (this.tipo === undefined || this.tipo === null) {
      this.toastr.info('Periodo sin seleccionar', 'Faltan datos');
      return false;
    }
    return true;
  }

  applyFilter(filterValue: string) {
    //this.dataSource.filter = '#' + filterValue.trim().toLowerCase();
  }

  // MES y Anio
  setAnios() {
    this.anios = new Array();
    const min = 2018;
    const fecha = new Date();
    const max = fecha.getFullYear();
    for (let i = min; i <= max; i++) {
      this.anios.push(i);
    }
    this.mesSeleccionado = fecha.getMonth();
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
            this.tipo = this.tipos[0]._id;
            this.buscar();
            // if (this.isAgregar) {
            //   this.cumplimiento.tipoCumplimiento = this.tipos[0]._id;
            //   this.cumplimiento.importe = this.tipos[0].importe;
            //   this.setAnioMesActual();
            //   this.setCasa();
            // } else {
            //   //Buscar datos
            // }

          } else {
            this.toastr.info('Sin datos', 'Agregue un tipo de cumplimiento');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  openAgregar(): void {
    const dialogRef = this.dialog.open(AgregarCumplimientoComponent, {
      disableClose: false, autoFocus: false, width: '550px', data: { isAgregar: true, cumplimiento: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openVer(cumplimientoId: string, tipo: string): void {
    const sTipo = this.tipos.find(t => t._id === tipo).nombre;

    const dialogRef = this.dialog.open(InfoCumplimientoComponent, {
      disableClose: false, autoFocus: false, width: '550px', data: {id: cumplimientoId, tipo: sTipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  getTipoSeleccionado() {
    const fTipo = this.tipos.find(t => t._id === this.tipo);
    return fTipo.nombre;
  }
}
