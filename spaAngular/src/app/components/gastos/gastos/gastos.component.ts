import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { GastoService } from '../gastos.service';
import { TipoGastoView } from 'src/app/models/tipoGasto/tipoGastoView';
import { AgregarTipoGastoComponent } from '../agregar-tipo-gasto/agregar-tipo-gasto.component';
import { TipoGastoEstado } from 'src/app/models/tipoGasto/tipoGastoEstado';
import { GastoSimpleView } from 'src/app/models/gasto/gastoSimpleView';
import { AgregarGastoComponent } from '../agregar-gasto/agregar-gasto.component';
import { FormControl } from '@angular/forms';
import { TipoGastoService } from '../tipoGasto.service';
import { TipoGastoAgregar } from 'src/app/models/tipoGasto/tipoGastoAgregar';
import { GastoTabla, GastoTablaElemento, GastoTablaImporte } from 'src/app/models/gasto/gastoTabla';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { InfoGastoComponent } from '../info-gasto/info-gasto.component';
import { GraficaGastoComponent } from '../grafica-gastos/grafica-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [TipoGastoService, GastoService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GastosComponent implements OnInit {
  tImporte = 0;
  gastos: GastoSimpleView[] = new Array();
  periodo = 'm';
  anios = [2018, 2019];
  anioSeleccionado = 2019;
  tiposGasto = new FormControl();
  tipos: TipoGastoView[] = [new TipoGastoView()];
  tiposString: string[] = [];
  tiposGastoSeleccionados: string[] = [];
  expandedElement: GastoTabla | null;
  mI = 0;
  mF = 11;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['gasto', 'm0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'total'];
  tablas: GastoTabla[] = new Array();
  dataSource = new MatTableDataSource(this.tablas);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // Totales
  totalGastos = 0;
  tm0 = 0;
  tm1 = 0;
  tm2 = 0;
  tm3 = 0;
  tm4 = 0;
  tm5 = 0;
  tm6 = 0;
  tm7 = 0;
  tm8 = 0;
  tm9 = 0;
  tm10 = 0;
  tm11 = 0;

  constructor(
    private identityUserService: IdentityUserService,
    private gastosService: GastoService,
    private tipoGastoService: TipoGastoService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private configService: ConfigService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.startGetDatos();
  }

  startGetDatos() {
    if (!this.identityUserService.getUserId()) {
      setTimeout(() => {
        this.startGetDatos();
      }, 1000);
    } else {
      this.buscarTiposGasto();
    }
  }

  buscar(): void {
    // Validar datos
    this.validarBusqueda();

    // set periodo
    this.setPeriodo();

    // set tipos
    const idGastos = new Array();
    this.tiposGastoSeleccionados.forEach(s => {
      idGastos.push(this.tipos.find(t => t.nombre === s)._id);
    });

    this.loadingService.show();
    this.gastosService.getGastos(this.anioSeleccionado, this.mI, this.mF, idGastos).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.gastos = res.payload;
            const table = this.crearTable(res.payload);
            this.setTotales(table);
            this.dataSource = new MatTableDataSource(table);
            this.dataSource.sort = this.sort;
            this.setPeriodoColumns();
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
    if (this.mI === undefined || this.mI === null) {
      this.toastr.info('Periodo sin seleccionar', 'Faltan datos');
      return false;
    }
    if (this.mF === undefined || this.mF === null) {
      this.toastr.info('Periodo sin seleccionar', 'Faltan datos');
      return false;
    }
    if (this.tiposGastoSeleccionados === null || this.tiposGastoSeleccionados.length === 0) {
      this.toastr.info('Tipo de gasto sin seleccionar', 'Faltan datos');
      return false;
    }
    return true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = '#' + filterValue.trim().toLowerCase();
  }

  // MES y Anio
  setAnios() {
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
    this.periodo = 'm';
  }

  setPeriodo() {
    switch (this.periodo) {
      case 'a': { this.mI = 0; this.mF = 11; } break;
      case 's': {
        const mActual = new Date().getMonth() + 1;
        const semestre = Math.floor(mActual / 6);
        this.mI = semestre === 0 ? 0 : 6;
        this.mF = semestre === 0 ? 5 : 11;
      } break;
      case 'b': {
        const mActual = new Date().getMonth() + 1;
        const bimestre = Math.floor(mActual / 2);
        this.mI = bimestre * 2 - 2;
        this.mF = bimestre * 2 - 1;
      } break;
      case 'm': {
        const mActual = new Date().getMonth();
        this.mI = mActual;
        this.mF = mActual;
      } break;
    }
  }

  setPeriodoColumns() {
    this.displayedColumns = new Array();
    this.displayedColumns.push('gasto');
    if (this.mI <= 0 && this.mF >= 0) { this.displayedColumns.push('m0'); }
    if (this.mI <= 1 && this.mF >= 1) { this.displayedColumns.push('m1'); }
    if (this.mI <= 2 && this.mF >= 2) { this.displayedColumns.push('m2'); }
    if (this.mI <= 3 && this.mF >= 3) { this.displayedColumns.push('m3'); }
    if (this.mI <= 4 && this.mF >= 4) { this.displayedColumns.push('m4'); }
    if (this.mI <= 5 && this.mF >= 5) { this.displayedColumns.push('m5'); }
    if (this.mI <= 6 && this.mF >= 6) { this.displayedColumns.push('m6'); }
    if (this.mI <= 7 && this.mF >= 7) { this.displayedColumns.push('m7'); }
    if (this.mI <= 8 && this.mF >= 8) { this.displayedColumns.push('m8'); }
    if (this.mI <= 9 && this.mF >= 9) { this.displayedColumns.push('m9'); }
    if (this.mI <= 10 && this.mF >= 10) { this.displayedColumns.push('m10'); }
    if (this.mI <= 11 && this.mF >= 11) { this.displayedColumns.push('m11'); }
    this.displayedColumns.push('total');
  }

  // TIPOS CUOTA
  buscarTiposGasto(): void {
    this.loadingService.show();
    this.tipoGastoService.getTiposGastos().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tipos = res.payload;
            this.tiposGastoSeleccionados.push(this.tipos[0].nombre);
            this.setImporte();
            this.setTiposString();
            this.setAnioMesActual();
            this.buscar();
            // if (this.isAgregar) {
            //   this.gasto.tipoGasto = this.tipos[0]._id;
            //   this.gasto.importe = this.tipos[0].importe;
            //   this.setAnioMesActual();
            //   this.setCasa();
            // } else {
            //   //Buscar datos
            // }

          } else {
            this.toastr.info('Sin datos', 'Agregue un tipo de gasto');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  setTiposString() {
    this.tiposString = new Array();
    this.tipos.forEach(t => this.tiposString.push(t.nombre));
  }

  setImporte() {
    this.tImporte = 0;
    this.tipos.forEach(t => {
      if (t.importe != null && t.importe !== undefined) { this.tImporte += t.importe; }
    });
  }

  openAgregar(): void {
    const dialogRef = this.dialog.open(AgregarGastoComponent, {
      disableClose: false, autoFocus: false, width: '550px', data: { isAgregar: true, gasto: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openVer(gastoId: string, tipo: string): void {
    const dialogRef = this.dialog.open(InfoGastoComponent, {
      disableClose: false, autoFocus: false, width: '550px', data: {id: gastoId, tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openGrafica(): void {
    const labels = new Array();
    const values = new Array();
    if (this.mI <= 0 && this.mF >= 0) { labels.push('Enero'); values.push(this.tm0); }
    if (this.mI <= 1 && this.mF >= 1) { labels.push('Febrero'); values.push(this.tm1); }
    if (this.mI <= 2 && this.mF >= 2) { labels.push('Marzo'); values.push(this.tm2); }
    if (this.mI <= 3 && this.mF >= 3) { labels.push('Abril'); values.push(this.tm3); }
    if (this.mI <= 4 && this.mF >= 4) { labels.push('Mayo'); values.push(this.tm4); }
    if (this.mI <= 5 && this.mF >= 5) { labels.push('Junio'); values.push(this.tm5); }
    if (this.mI <= 6 && this.mF >= 6) { labels.push('Julio'); values.push(this.tm6); }
    if (this.mI <= 7 && this.mF >= 7) { labels.push('Agosto'); values.push(this.tm7); }
    if (this.mI <= 8 && this.mF >= 8) { labels.push('Septiembre'); values.push(this.tm8); }
    if (this.mI <= 9 && this.mF >= 9) { labels.push('Octubre'); values.push(this.tm9); }
    if (this.mI <= 10 && this.mF >= 10) { labels.push('Noviembre'); values.push(this.tm10); }
    if (this.mI <= 11 && this.mF >= 11) { labels.push('Diciembre'); values.push(this.tm11); }

    const dialogRef = this.dialog.open(GraficaGastoComponent, {
      disableClose: false, autoFocus: false, width: '950px', data: {totales: values, meses: labels, }
    });
  }



  // tslint:disable-next-line: max-line-length
  // ------------------------------------------------------------------------Crear tabla------------------------------------------------------------
  crearTable(gastos: GastoSimpleView[]): GastoTabla[] {
    const tabla: GastoTabla[] = new Array();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < gastos.length; i++) {
        // Validar existencia de gasto sobre la casa
        const indexGastoCasa = tabla.findIndex(t => t.tipoGasto === gastos[i].tipoGasto);

        // No existe
        if (indexGastoCasa === -1) {

          // Se crea row casa gasto
          const gasto = new GastoTabla();
          gasto.tipoGasto = gastos[i].tipoGasto;
          gasto.nombreGasto = this.tipos.find(t => t._id === gastos[i].tipoGasto).nombre;
          gasto.cuota = this.crearElementoGasto(gastos[i]);

          // Agregar casa
          tabla.push(gasto);
        } else {
          // Si ya existe
          this.asignarGastoImporte(gastos[i], tabla[indexGastoCasa].cuota);
        }
    }

    return tabla;
  }

  isMainGasto(gasto: GastoSimpleView): boolean {
    if (this.tiposGastoSeleccionados === null || this.tiposGastoSeleccionados.length === 0 ||
      this.tiposGastoSeleccionados === null || this.tiposGastoSeleccionados.length === 0) { return false; }

    const mainTipo = this.tipos.find(t => t.nombre === this.tiposGastoSeleccionados[0]);
    if (gasto.tipoGasto === mainTipo._id) { return true; }

    return false;
  }

  crearElementoGasto(gasto: GastoSimpleView): GastoTablaElemento {
    const elemento = new GastoTablaElemento();
    this.asignarGastoImporte(gasto, elemento);
    return elemento;
  }

  asignarGastoImporte(gasto: GastoSimpleView, elemento: GastoTablaElemento) {
    switch (gasto.mes) {
      case 0: elemento.m0 = this.creaGastoImporte(gasto); break;
      case 1: elemento.m1 = this.creaGastoImporte(gasto); break;
      case 2: elemento.m2 = this.creaGastoImporte(gasto); break;
      case 3: elemento.m3 = this.creaGastoImporte(gasto); break;
      case 4: elemento.m4 = this.creaGastoImporte(gasto); break;
      case 5: elemento.m5 = this.creaGastoImporte(gasto); break;
      case 6: elemento.m6 = this.creaGastoImporte(gasto); break;
      case 7: elemento.m7 = this.creaGastoImporte(gasto); break;
      case 8: elemento.m8 = this.creaGastoImporte(gasto); break;
      case 9: elemento.m9 = this.creaGastoImporte(gasto); break;
      case 10: elemento.m10 = this.creaGastoImporte(gasto); break;
      case 11: elemento.m11 = this.creaGastoImporte(gasto); break;
    }
  }

  creaGastoImporte(gasto: GastoSimpleView): GastoTablaImporte {
    const gastoImporte = new GastoTablaImporte();
    gastoImporte._id = gasto._id;
    gastoImporte.importe = gasto.importe;
    return gastoImporte;
  }

  setTotales(tabla: GastoTabla[]) {
    this.limpiarTotales();
    tabla.forEach(t => {
      this.setTotalElement(t.cuota);
      this.totalGastos += t.cuota.total;
      // if (t.mainGasto) {
      //   this.setTotalElement(t.mainGasto);
      //   this.totalGastos += t.mainGasto.total;
      // }
      // if (t.otraGasto != null && t.otraGasto.length > 0) {
      //   t.otraGasto.forEach(o => {
      //     this.setTotalElement(o);
      //     this.totalGastos += o.total;
      //   });
      // }
    });
  }

  limpiarTotales() {
    this.tm0 = 0;
    this.tm1 = 0;
    this.tm2 = 0;
    this.tm3 = 0;
    this.tm4 = 0;
    this.tm5 = 0;
    this.tm6 = 0;
    this.tm7 = 0;
    this.tm8 = 0;
    this.tm9 = 0;
    this.tm10 = 0;
    this.tm11 = 0;
    this.totalGastos = 0;
  }

  setTotalElement(elemento: GastoTablaElemento) {
    let total = 0;
    if (elemento.m0 != null) { total += elemento.m0.importe; this.tm0 += elemento.m0.importe; }
    if (elemento.m1 != null) { total += elemento.m1.importe; this.tm1 += elemento.m1.importe; }
    if (elemento.m2 != null) { total += elemento.m2.importe; this.tm2 += elemento.m2.importe; }
    if (elemento.m3 != null) { total += elemento.m3.importe; this.tm3 += elemento.m3.importe; }
    if (elemento.m4 != null) { total += elemento.m4.importe; this.tm4 += elemento.m4.importe; }
    if (elemento.m5 != null) { total += elemento.m5.importe; this.tm5 += elemento.m5.importe; }
    if (elemento.m6 != null) { total += elemento.m6.importe; this.tm6 += elemento.m6.importe; }
    if (elemento.m7 != null) { total += elemento.m7.importe; this.tm7 += elemento.m7.importe; }
    if (elemento.m8 != null) { total += elemento.m8.importe; this.tm8 += elemento.m8.importe; }
    if (elemento.m9 != null) { total += elemento.m9.importe; this.tm9 += elemento.m9.importe; }
    if (elemento.m10 != null) { total += elemento.m10.importe; this.tm10 += elemento.m10.importe; }
    if (elemento.m11 != null) { total += elemento.m11.importe; this.tm11 += elemento.m11.importe; }
    elemento.total = total;
  }
}
