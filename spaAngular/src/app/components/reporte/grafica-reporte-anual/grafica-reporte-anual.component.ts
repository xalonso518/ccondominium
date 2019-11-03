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
import { ConstantsCatalogos } from 'src/app/utils/constants/ConstantsCatalogos';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-grafica-reporte-anual',
  templateUrl: './grafica-reporte-anual.component.html',
  styleUrls: ['./grafica-reporte-anual.component.css'],
  providers: [ErrorValidationService, ConfigService],
  animations: [slideInDownAnimation, listAnimation]
})
export class GraficaReporteAnualComponent implements OnInit {
  ingresos: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  egresos: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  remanente: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  constructor(
    private config: ConfigService,
    private toastr: ToastrService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    private errorValidationService: ErrorValidationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GraficaReporteAnualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingresos: number[], egresos: number[], remanente: number[] }) { }


  // Grafica
  // tslint:disable-next-line: max-line-length
  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  aTotales: number[] = new Array();

  public barChartData: any[] = [
    { data: this.ingresos, label: 'Ingreos' },
    { data: this.egresos, label: 'Egresos' },
    { data: this.remanente, label: 'Remanente' },
  ];

  // Configuraciones graficas
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public lineChartColors: Array<any> = [

    { // verde
      backgroundColor: '#4dcc74',
      pointBorderColor: '#fff',
    },
    { // azul
      backgroundColor: '#0463ff',
      pointBorderColor: '#fff',
    },
    { // naranja
      backgroundColor: '#ff8630',
      pointBorderColor: '#fff',
    },
    { // morado
      backgroundColor: '#8f30ff',
      pointBorderColor: '#fff',
    },
    { // rojo
      backgroundColor: '#ff305c',
      pointBorderColor: '#fff',
    },
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
        label(tooltipItem: any, data: any) {
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
      this.ingresos = this.data.ingresos;
      this.egresos = this.data.egresos;
      this.remanente = this.data.remanente;
    }
    this.setValoresGrafica();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  setValoresGrafica() {
    let _lineChartData: Array<any> = new Array(1);
    _lineChartData[0] = { data: this.ingresos, label: this.barChartData[0].label };
    _lineChartData[1] = { data: this.egresos, label: this.barChartData[1].label };
    _lineChartData[2] = { data: this.remanente, label: this.barChartData[2].label };

    this.barChartData = _lineChartData;
  }


}
