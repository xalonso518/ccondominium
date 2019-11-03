import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { CuotaService } from '../Cuota.service';
import { FormControl } from '@angular/forms';
import { TipoCuotaService } from '../tipoCuota.service';
import { TipoCuotaAgregar } from 'src/app/models/tipoCuota/tipoCuotaAgregar';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CuotaFaltante, CuotaFaltanteTable, CuotaFaltanteImporte, CuotaFaltanteCasas } from 'src/app/models/cuota/cuotaFaltante';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';


@Component({
  selector: 'app-cuotas-pendientes',
  templateUrl: './cuotas-pendientes.component.html',
  styleUrls: ['./cuotas-pendientes.component.css'],
  providers: [TipoCuotaService, CuotaService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CuotasPendientesComponent implements OnInit {
  cuotas: CuotaFaltante;
  meses = ConstantsCatalogos.MESES;
  anios = [2018, 2019];
  anioSeleccionado = 2019;
  tipos: TipoCuotaAgregar[] = [new TipoCuotaAgregar()];
  tipo: string;
  mes: number;
  tablas: CuotaFaltanteTable[] = new Array();
  displayedColumns: string[] = ['casa', 'importe'];
  dataSource = new MatTableDataSource(this.tablas);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private identityUserService: IdentityUserService,
    private cuotasService: CuotaService,
    private tipoCuotaService: TipoCuotaService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private configService: ConfigService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.startGetDatos();
  }

  startGetDatos() {
    this.setAnios();
    this.setAnioMesActual();
    if (!this.identityUserService.getUserId()) {
      setTimeout(() => {
        this.startGetDatos();
      }, 1000);
    } else {
      this.buscarTiposCuota();
    }
  }

  buscar(): void {
    // Validar datos
    if (!this.validarBusqueda()) { return; }

    this.loadingService.show();
    this.cuotasService.getCuotasFaltantes(this.anioSeleccionado, this.mes, this.tipo).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null) {
            this.cuotas = res.payload;
            this.crearTabla(this.cuotas.casas, this.cuotas.cuotas);
            this.dataSource = new MatTableDataSource(this.tablas);
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
    if (this.mes === undefined || this.mes === null) {
      this.toastr.info('Mes sin seleccionar', 'Faltan datos');
      return false;
    }
    if (this.tipo === undefined || this.tipo === null) {
      this.toastr.info('Tipo sin seleccionar', 'Faltan datos');
      return false;
    }
    return true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  }

  setAnioMesActual() {
    const fecha = new Date();
    this.anioSeleccionado = fecha.getFullYear();
    this.mes = fecha.getMonth();
  }

  // TIPOS CUOTA
  buscarTiposCuota(): void {
    this.loadingService.show();
    this.tipoCuotaService.getTiposCuotas().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tipos = res.payload;
            this.tipo = this.tipos[0]._id;
            this.buscar();
          } else {
            this.toastr.info('Sin datos', 'Agregue un tipo de cuota');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  // Tabla
  crearTabla(casas: CuotaFaltanteCasas[], cuotas: CuotaFaltanteImporte[]) {
    this.tablas = new Array();
    casas.forEach(c => {
      const indexCuota = cuotas.findIndex(cuota => cuota.casa === c.casa);
      if (indexCuota === -1 || cuotas[indexCuota].importe === 0) {
        const row = new CuotaFaltanteTable();
        row.casa = c.casa;
        row.importe = 0;
        this.tablas.push(row);
      }
    });
    if (this.tablas.length === 0) {
      this.toastr.info('Sin casas pendientes');
    }
  }
}
