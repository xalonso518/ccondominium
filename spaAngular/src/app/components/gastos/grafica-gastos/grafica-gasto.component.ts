import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioAgregar } from 'src/app/models/usuario/usuarioAgregar';
import { slideInDownAnimation, listAnimation } from 'src/app/utils/constants/animations';
import { ErrorValidationService } from 'src/app/utils/service/error-validation.service';
import { ConfigService } from 'src/app/utils/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GastoService } from '../gastos.service';
import { GastoView, GastoArchivoView } from 'src/app/models/gasto/gastoView';
import { GastoTabla } from 'src/app/models/gasto/gastoTabla';
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-grafica-gasto',
  templateUrl: './grafica-gasto.component.html',
  styleUrls: ['./grafica-gasto.component.css'],
  providers: [GastoService, ErrorValidationService, ConfigService],
  animations: [slideInDownAnimation, listAnimation]
})
export class GraficaGastoComponent implements OnInit {
  totales: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private gastoService: GastoService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GraficaGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { totales: number[], meses: string[] }) { }


  // Grafica
  public barChartLabels: string[] = [];
  aTotales: number[] = new Array();

  public barChartData: any[] = [
    { data: this.totales, label: 'Gastos' },
  ];

  // Configuraciones graficas
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public lineChartColors: Array<any> = [
    { // azul
      backgroundColor: '#0463ff',
      pointBorderColor: '#fff',
    }
  ];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      usePointStyle: true,
      labels: {
        usePointStyle: true,
        fontFamily: 'montserrat',
        fontColor: '#343944',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#343944',
          fontFamily: 'montserrat',
          callback(value: any, index: any, values: any) {
            return '$' + value.toLocaleString();
          }
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#343944',
          fontFamily: 'montserrat'
        },
        gridLines: {
          display: false
        }
      }]
    },
    tooltips: {
      backgroundColor: '#fff',
      titleFontFamily: 'montserrat',
      titleFontColor: '#343944',
      bodyFontFamily: 'montserrat',
      bodyFontColor: '#343944',
      bodyFontSize: 11,
      borderColor: '#e0e0e0',
      borderWidth: '1',
      callbacks: {
        label (tooltipItem: any, data: any) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            var c: string = tooltipItem.yLabel;
            label += ' : ';
          }
          label += ' $' + tooltipItem.yLabel.toLocaleString() + ' MXN';
          return label;
        },
      },
      labelColors: ['#0463ff'],
    }
  };

  ngOnInit() {
    if (this.data == null) { this.onNoClick(); } else {
      this.barChartLabels = this.data.meses;
      this.totales = this.data.totales;
    }
    this.setValoresGrafica();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getMes(mes: number): string {
    return ConstantsCatalogos.getMes(mes);
  }

  setValoresGrafica() {
    let _lineChartData: Array<any> = new Array(1);
    _lineChartData[0] = { data: this.totales, label: this.barChartData[0].label };

    this.barChartData = _lineChartData;
  }


}
