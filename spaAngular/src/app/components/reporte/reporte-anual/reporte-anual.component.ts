import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from 'src/app/utils/service/config.service';
import { MatDialog } from '@angular/material';
import { TipoGastoView } from 'src/app/models/tipoGasto/tipoGastoView';
import { GastoSimpleView } from 'src/app/models/gasto/gastoSimpleView';
import { FormControl } from '@angular/forms';
import { GastoTabla, GastoTablaElemento, GastoTablaImporte } from 'src/app/models/gasto/gastoTabla';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ReporteService } from '../reporte.service';
import { ReporteAnual, ReporteAnualRow, ReporteAnualTableRow, ReporteAnualSaldos } from 'src/app/models/reporte/reporteAnual';
import { TipoGastoService } from '../../gastos/tipoGasto.service';
import { TipoCuotaService } from '../../cuotas/tipoCuota.service';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { ThemeService } from 'ng2-charts';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { GraficaReporteAnualComponent } from '../grafica-reporte-anual/grafica-reporte-anual.component';

@Component({
  selector: 'app-reporte-anual',
  templateUrl: './reporte-anual.component.html',
  styleUrls: ['./reporte-anual.component.css'],
  providers: [ReporteService, TipoCuotaService, TipoGastoService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReporteAnualComponent implements OnInit {
  reporte: ReporteAnual;
  anios = [2018, 2019];
  anioSeleccionado = 2019;

  // Tipos
  tiposCuotas: TipoCuotaView[] = [new TipoCuotaView()];
  tiposGastos: TipoGastoView[] = [new TipoGastoView()];

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['tipo', 'm0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11'];
  tablaGastos: ReporteAnualTableRow[] = new Array();
  tablaCuotas: ReporteAnualTableRow[] = new Array();
  dataSourceCuotas = new MatTableDataSource(this.tablaCuotas);
  dataSourceGastos = new MatTableDataSource(this.tablaGastos);
  dataSourceSaldos = new MatTableDataSource();

  // Totales
  totalesCuotas: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  totalesGastos: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  remanente: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  saldoInicial: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  saldoFinal: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  constructor(
    private identityUserService: IdentityUserService,
    private reporteService: ReporteService,
    private tipoCuotaService: TipoCuotaService,
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
      this.buscarTiposCuota();
    }
  }

  buscar() {
    // Validar datos
    this.validarBusqueda();

    this.loadingService.show();
    this.reporteService.getReporteAnual(this.anioSeleccionado).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload) {
            //this.reporte = res.payload;
            this.crearTablaCuotas(res.payload.cuotas);
            this.crearTablaGastos(res.payload.gastos);
            this.setTotalCuotas();
            this.setTotalGastos();
            this.setRemante();
            console.log('222');
            this.dataSourceCuotas = new MatTableDataSource(this.tablaCuotas);
            this.dataSourceGastos = new MatTableDataSource(this.tablaGastos);
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
    return true;
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
  }

  // TIPOS CUOTA
  buscarTiposCuota(): void {
    this.loadingService.show();
    this.tipoCuotaService.getTiposCuotasTodos().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tiposCuotas = res.payload;
            this.buscarTiposGasto();
          } else {
            this.toastr.info('Sin datos', 'Volver a cargar los tipos de cuota');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  // TIPOS GASTO
  buscarTiposGasto(): void {
    this.loadingService.show();
    this.tipoGastoService.getTiposGastosTodos().subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.tiposGastos = res.payload;
            this.buscar();
          } else {
            this.toastr.info('Sin datos', 'Volver a cargar los tipos de gastos');
          }
        }
      }, error => {
        this.loadingService.hide();
        this.toastr.error(error, 'Error');
      }
    );
  }

  //SET TABLAS
  crearTablaCuotas(cuotas: ReporteAnualRow[]) {
    this.tablaCuotas = new Array();
    cuotas.forEach(c => {
      // tslint:disable-next-line: triple-equals
      const fTipoIndex = this.tablaCuotas.findIndex(t => t._id === c._id._id);

      //Si no existe la fila se crea
      if (fTipoIndex === -1) {
        const row = new ReporteAnualTableRow();
        row._id = c._id._id;
        row.tipo = this.tiposCuotas.find(t => t._id === c._id._id).nombre;
        this.setImporteMesTableRow(row, c._id.mes, c.importe);
        this.tablaCuotas.push(row);
      } else {
        this.setImporteMesTableRow(this.tablaCuotas[fTipoIndex], c._id.mes, c.importe);
      }
    });
  }

  crearTablaGastos(gastos: ReporteAnualRow[]) {
    this.tablaGastos = new Array();
    gastos.forEach(c => {
      // tslint:disable-next-line: triple-equals
      const fTipoIndex = this.tablaGastos.findIndex(t => t._id === c._id._id);

      //Si no existe la fila se crea
      if (fTipoIndex === -1) {
        const row = new ReporteAnualTableRow();
        row._id = c._id._id;
        row.tipo = this.tiposGastos.find(t => t._id === c._id._id).nombre;
        this.setImporteMesTableRow(row, c._id.mes, c.importe);
        this.tablaGastos.push(row);
      } else {
        this.setImporteMesTableRow(this.tablaGastos[fTipoIndex], c._id.mes, c.importe);
      }
    });
  }

  setImporteMesTableRow(row: ReporteAnualTableRow, mes: number, importe: number) {
    try {
      row.importes[mes] = importe;
    } catch (e) {

    }
  }

  setTotalCuotas() {
    this.totalesCuotas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.tablaCuotas.forEach(c => {
      for (let i = 0; i <= 11; i++) {
        this.totalesCuotas[i] += c.importes[i];
      }
    });
  }

  setTotalGastos() {
    this.totalesGastos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.tablaGastos.forEach(c => {
      for (let i = 0; i <= 11; i++) {
        this.totalesGastos[i] += c.importes[i];
      }
    });
  }

  setRemante() {
    for (let i = 0; i <= 11; i++) {
      this.remanente[i] = this.totalesCuotas[i] - this.totalesGastos[i];

      //Saldo incial
      if (i > 0) {
        this.saldoInicial[i] = this.saldoFinal[i - 1];
      }

      //Saldo final
      this.saldoFinal[i] = this.remanente[i] + this.saldoInicial[i];
    }
    const tabla = new Array();
    const rowRemanente = new ReporteAnualSaldos();
    rowRemanente.tipo = 'REMANENTE';
    rowRemanente.importes = this.remanente;
    tabla.push(rowRemanente);

    const rowSaldoI = new ReporteAnualSaldos();
    rowSaldoI.tipo = 'SALDO INICIAL';
    rowSaldoI.importes = this.saldoInicial;
    tabla.push(rowSaldoI);

    const rowSaldoF = new ReporteAnualSaldos();
    rowSaldoF.tipo = 'SALDO FINAL';
    rowSaldoF.importes = this.saldoFinal;
    tabla.push(rowSaldoF);

    this.dataSourceSaldos = new MatTableDataSource(tabla);
  }


  imprimir() {
    let printContent = document.getElementById("reporte");
    let WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');

    if (printContent != null && WindowPrt != null) {
        WindowPrt.document.head.innerHTML = ('<style>' + ConstantsCatalogos.PRINT_STYLE + '</style>');
        WindowPrt.document.body.innerHTML = (printContent.innerHTML);
        // WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }
}


openGrafica(): void {
  const dialogRef = this.dialog.open(GraficaReporteAnualComponent, {
    // tslint:disable-next-line: max-line-length
    disableClose: false, autoFocus: false, width: '950px', data: {ingresos: this.totalesCuotas, egresos: this.totalesGastos, remanente: this.remanente }
  });
}

}
