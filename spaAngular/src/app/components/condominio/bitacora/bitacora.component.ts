import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityUserService } from 'src/app/utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { BitacoraView } from 'src/app/models/condominio/bitacoraView';
import { CondominioService } from '../condominio.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  providers: [CondominioService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BitacoraComponent implements OnInit {
  bitacoras: BitacoraView[] = new Array();
  fecha1 = new FormControl(new Date());
  fecha2 = new FormControl(new Date());
  fechaInicio = new Date();
  fechaFinal = new Date();

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['accion', 'fecha'];
  dataSource = new MatTableDataSource(this.bitacoras);

  constructor(
    private identityUserService: IdentityUserService,
    private condominioService: CondominioService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fechaInicio.setDate(1);
    this.fecha1 = new FormControl(this.fechaInicio);
    this.startGetDatos();
  }

  startGetDatos() {
    if (!this.identityUserService.getUserId()) {
      setTimeout(() => {
        this.startGetDatos();
      }, 1000);
    } else {
      this.buscar();
    }
  }

  buscar(): void {
    this.loadingService.show();
    var ss = this.fechaInicio;
    var ss2 = this.fechaFinal;
    const f1 = this.fechaInicio.toUTCString();
    const f2 = this.fechaFinal.toUTCString();
    this.condominioService.getBitacoras(this.fechaInicio, this.fechaFinal).subscribe(
      res => {
        this.loadingService.hide();
        if (res.success) {
          if (res.payload != null && res.payload.length > 0) {
            this.bitacoras = res.payload;
            this.dataSource = new MatTableDataSource(this.bitacoras);
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
}

