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
import { CuotaAgregar } from 'src/app/models/cuota/cuotaAgregar';



@Component({
  selector: 'app-agregar-cuota-tabla',
  templateUrl: './agregar-cuota-tabla.component.html',
  styleUrls: ['./agregar-cuota-tabla.component.css'],
  providers: [TipoCuotaService, CuotaService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AgregarCuotaTablaComponent implements OnInit {
  cuotas: CuotaFaltante;
  meses = ConstantsCatalogos.MESES;
  anios = [2018, 2019];
  anioSeleccionado = 2019;
  tipos: TipoCuotaAgregar[] = [new TipoCuotaAgregar()];
  tipo: string;
  mes: number;
  tablas: CuotaFaltanteTable[] = new Array();
  displayedColumns: string[] = ['casa', 'importe', 'nueva'];
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
    this.dataSource.filter = '#' + filterValue.trim().toLowerCase();
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
      const row = new CuotaFaltanteTable();
      row.casa = '#' + c.casa;
      if (indexCuota === -1 || cuotas[indexCuota].importe === 0) {
        row._id = '0';
        row.importe = 0;
      } else {
        row._id = cuotas[indexCuota]._id;
        row.importe = cuotas[indexCuota].importe;
      }
      this.tablas.push(row);
    });
    if (this.tablas.length === 0) {
      this.toastr.info('Sin casas pendientes');
    }
  }

  // Acciones
  accionTabla(cuota: CuotaFaltanteTable, e: any) {
    const importe = Number.parseFloat(e);
    if (e !== undefined && e != null && e.trim() !== '' && importe !== cuota.importe) {
      if (cuota._id === '0') {
        this.agregar(cuota, importe);
      } else {
        this.editar(cuota, importe);
      }
    }
  }

  agregar(cuota: CuotaFaltanteTable, importe: number) {
    const nCuota = new CuotaAgregar();
    nCuota.casa = cuota.casa.replace('#', '');
    nCuota.anio = this.anioSeleccionado;
    nCuota.mes = this.mes;
    nCuota.tipoCuota = this.tipo;
    nCuota.usuario = this.identityUserService.getUserUser();
    nCuota.importe = importe;
    nCuota.nota = '';

    this.loadingService.show();
    this.cuotasService.postCuota(nCuota)
      .subscribe(
        registro => {
          this.loadingService.hide();
          this.toastr.success('Registro correcto', 'Datos correctos!');
          cuota._id = registro.payload;
          cuota.importe = importe;
        }, error => {
          this.loadingService.hide();
          this.toastr.error(error);
        }, () => {
          this.loadingService.hide();
        }
      );
  }

  editar(cuota: CuotaFaltanteTable, importe: number) {
    const nCuota = new CuotaAgregar();
    nCuota._id = cuota._id;
    nCuota.importe = importe;

    this.cuotasService.putCuotaImporte(nCuota)
    .subscribe(
    registro => {
        this.loadingService.hide();
        this.toastr.success('Cambio correcto', 'Datos correctos!');
        cuota.importe = importe;
        }, error => {
            this.loadingService.hide();
            this.toastr.error(error);
        }, () => {
            this.loadingService.hide();
        }
    );
  }

}
