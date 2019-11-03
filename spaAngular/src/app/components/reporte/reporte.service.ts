import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { TipoGastoView } from 'src/app/models/tipoGasto/tipoGastoView';
import { TipoGastoAgregar } from 'src/app/models/tipoGasto/tipoGastoAgregar';
import { TipoGastoEstado } from 'src/app/models/tipoGasto/tipoGastoEstado';
import { GastoAgregar } from 'src/app/models/gasto/gastoAgregar';
import { GastoSimpleView } from 'src/app/models/gasto/gastoSimpleView';
import { GastoView } from 'src/app/models/gasto/gastoView';
import { GastoEliminarArchivo } from 'src/app/models/gasto/gastoEliminarArchivo';
import { ImportarXmlResponse } from 'src/app/models/file/ImportarXmlResponse';
import { GastoFaltante } from 'src/app/models/gasto/gastoFaltante';
import { ReporteAnual } from 'src/app/models/reporte/reporteAnual';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private apiClient: ApiClientService) {
  }

  getReporteAnual(anio: number): Observable<ApiResponse<ReporteAnual>> {
    let params = new HttpParams();
    params = params.set('anio', anio.toString());
    return this.apiClient.apiGetParam<ReporteAnual>(ConstantsRoutes.REPORTE_ANUAL, params);
  }
}
