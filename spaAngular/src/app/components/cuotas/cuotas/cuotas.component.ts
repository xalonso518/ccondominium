import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { CuotaService } from '../Cuota.service';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { AgregarTipoCuotaComponent } from '../agregar-tipo-cuota/agregar-tipo-cuota.component';
import { TipoCuotaEstado } from 'src/app/models/tipoCuota/tipoCuotaEstado';
import { CuotaSimpleView } from 'src/app/models/cuota/cuotaSimpleView';
import { AgregarCuotaComponent } from '../agregar-cuota/agregar-cuota.component';
import { FormControl } from '@angular/forms';
import { TipoCuotaService } from '../tipoCuota.service';
import { TipoCuotaAgregar } from 'src/app/models/tipoCuota/tipoCuotaAgregar';
import { CuotaTabla, CuotaTablaElemento, CuotaTablaImporte } from 'src/app/models/cuota/cuotaTabla';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { InfoCuotaComponent } from '../info-cuota/info-cuota.component';
import { GraficaCuotaComponent } from '../grafica-cuota/grafica-cuota.component';
import { UsuariosCuotaComponent } from '../usuarios-cuota/usuarios-cuota.component';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css'],
  providers: [TipoCuotaService, CuotaService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CuotasComponent implements OnInit {
  tImporte = 0;
  cuotas: CuotaSimpleView[] = new Array();
  periodo = 'm';
  anios = [2018, 2019];
  anioSeleccionado = 2019;
  tiposCuota = new FormControl();
  tipos: TipoCuotaView[] = [new TipoCuotaView()];
  tiposString: string[] = [];
  tiposCuotaSeleccionados: string[] = [];
  expandedElement: CuotaTabla | null;
  mI = 0;
  mF = 11;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['casa', 'cuota', 'm0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'total'];
  tablas: CuotaTabla[] = new Array();
  dataSource = new MatTableDataSource(this.tablas);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // Totales
  totalCuotas = 0;
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
    private cuotasService: CuotaService,
    private tipoCuotaService: TipoCuotaService,
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
      this.buscarTiposCuota();
    }
  }

  buscar(): void {
    // Validar datos
    this.validarBusqueda();

    // set periodo
    this.setPeriodo();

    // set tipos
    const idCuotas = new Array();
    this.tiposCuotaSeleccionados.forEach(s => {
      idCuotas.push(this.tipos.find(t => t.nombre === s)._id);
    });

    this.loadingService.show();
    this.cuotasService.getCuotas(this.anioSeleccionado, this.mI, this.mF, idCuotas).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.cuotas = res.payload;
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
    if (this.tiposCuotaSeleccionados === null || this.tiposCuotaSeleccionados.length === 0) {
      this.toastr.info('Tipo de cuota sin seleccionar', 'Faltan datos');
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
    this.displayedColumns.push('casa');
    if (this.tiposCuotaSeleccionados.length > 1) { this.displayedColumns.push('cuota'); }
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
  buscarTiposCuota(): void {
    this.loadingService.show();
    this.tipoCuotaService.getTiposCuotas().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tipos = res.payload;
            this.tiposCuotaSeleccionados.push(this.tipos[0].nombre);
            this.setImporte();
            this.setTiposString();
            this.setAnioMesActual();
            this.buscar();
            // if (this.isAgregar) {
            //   this.cuota.tipoCuota = this.tipos[0]._id;
            //   this.cuota.importe = this.tipos[0].importe;
            //   this.setAnioMesActual();
            //   this.setCasa();
            // } else {
            //   //Buscar datos
            // }

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
    const dialogRef = this.dialog.open(AgregarCuotaComponent, {
      disableClose: false, autoFocus: false, width: '550px', data: { isAgregar: true, cuota: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openVer(cuotaId: string, tipo: string): void {
    const dialogRef = this.dialog.open(InfoCuotaComponent, {
      disableClose: false, autoFocus: false, width: '550px', data: {id: cuotaId, tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.buscar(); }
    });
  }

  openCasa(casa: string): void {
    const dialogRef = this.dialog.open(UsuariosCuotaComponent, {
      disableClose: false, autoFocus: false, width: '850px', data: {casa: casa.replace('#', '')}
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

    const dialogRef = this.dialog.open(GraficaCuotaComponent, {
      disableClose: false, autoFocus: false, width: '950px', data: {totales: values, meses: labels, }
    });
  }



  // tslint:disable-next-line: max-line-length
  // ------------------------------------------------------------------------Crear tabla------------------------------------------------------------
  crearTable(cuotas: CuotaSimpleView[]): CuotaTabla[] {
    const tabla: CuotaTabla[] = new Array();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cuotas.length; i++) {
      // Validar que tenga casa asignada
      if (cuotas[i].casa !== undefined && cuotas[i].casa !== '') {
        // Validar existencia de cuota sobre la casa
        const indexCuotaCasa = tabla.findIndex(t => t.casa === ('#' + cuotas[i].casa) && t.tipoCuota === cuotas[i].tipoCuota);

        // No existe
        if (indexCuotaCasa === -1) {

          // Se crea row casa cuota
          const cuota = new CuotaTabla();
          cuota.casa = '#' + cuotas[i].casa;
          cuota.tipoCuota = cuotas[i].tipoCuota;
          cuota.nombreCuota = this.tipos.find(t => t._id === cuotas[i].tipoCuota).nombre;
          cuota.cuota = this.crearElementoCuota(cuotas[i]);

          // Agregar casa
          tabla.push(cuota);
        } else {
          // Si ya existe
          this.asignarCuotaImporte(cuotas[i], tabla[indexCuotaCasa].cuota);
        }
      }
    }

    return tabla;
  }

  isMainCuota(cuota: CuotaSimpleView): boolean {
    if (this.tiposCuotaSeleccionados === null || this.tiposCuotaSeleccionados.length === 0 ||
      this.tiposCuotaSeleccionados === null || this.tiposCuotaSeleccionados.length === 0) { return false; }

    const mainTipo = this.tipos.find(t => t.nombre === this.tiposCuotaSeleccionados[0]);
    if (cuota.tipoCuota === mainTipo._id) { return true; }

    return false;
  }

  crearElementoCuota(cuota: CuotaSimpleView): CuotaTablaElemento {
    const elemento = new CuotaTablaElemento();
    this.asignarCuotaImporte(cuota, elemento);
    return elemento;
  }

  asignarCuotaImporte(cuota: CuotaSimpleView, elemento: CuotaTablaElemento) {
    switch (cuota.mes) {
      case 0: elemento.m0 = this.creaCuotaImporte(cuota); break;
      case 1: elemento.m1 = this.creaCuotaImporte(cuota); break;
      case 2: elemento.m2 = this.creaCuotaImporte(cuota); break;
      case 3: elemento.m3 = this.creaCuotaImporte(cuota); break;
      case 4: elemento.m4 = this.creaCuotaImporte(cuota); break;
      case 5: elemento.m5 = this.creaCuotaImporte(cuota); break;
      case 6: elemento.m6 = this.creaCuotaImporte(cuota); break;
      case 7: elemento.m7 = this.creaCuotaImporte(cuota); break;
      case 8: elemento.m8 = this.creaCuotaImporte(cuota); break;
      case 9: elemento.m9 = this.creaCuotaImporte(cuota); break;
      case 10: elemento.m10 = this.creaCuotaImporte(cuota); break;
      case 11: elemento.m11 = this.creaCuotaImporte(cuota); break;
    }
  }

  creaCuotaImporte(cuota: CuotaSimpleView): CuotaTablaImporte {
    const cuotaImporte = new CuotaTablaImporte();
    cuotaImporte._id = cuota._id;
    cuotaImporte.importe = cuota.importe;
    return cuotaImporte;
  }

  setTotales(tabla: CuotaTabla[]) {
    this.limpiarTotales();
    tabla.forEach(t => {
      this.setTotalElement(t.cuota);
      this.totalCuotas += t.cuota.total;
      // if (t.mainCuota) {
      //   this.setTotalElement(t.mainCuota);
      //   this.totalCuotas += t.mainCuota.total;
      // }
      // if (t.otraCuota != null && t.otraCuota.length > 0) {
      //   t.otraCuota.forEach(o => {
      //     this.setTotalElement(o);
      //     this.totalCuotas += o.total;
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
    this.totalCuotas = 0;
  }

  setTotalElement(elemento: CuotaTablaElemento) {
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
