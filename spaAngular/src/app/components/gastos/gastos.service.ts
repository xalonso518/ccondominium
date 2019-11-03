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

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private apiClient: ApiClientService) {
  }

  getGastos(anio: number, mI: number, mF: number, tipos: string[]): Observable<ApiResponse<GastoSimpleView[]>> {
    let params = new HttpParams();
    params = params.set('anio', anio.toString());
    params = params.set('mI', mI.toString());
    params = params.set('mF', mF.toString());
    params = params.set('tipos', tipos.join('@'));
    return this.apiClient.apiGetParam<GastoSimpleView[]>(ConstantsRoutes.GASTOS, params);
  }

  getGasto(id: string): Observable<ApiResponse<GastoView>> {
    return this.apiClient.apiGet<GastoView>(ConstantsRoutes.GASTO_GET + `/${id}`);
  }

  postGastoFile(gasto: FormData): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, FormData>(ConstantsRoutes.GASTO_AGREGAR_FILE, gasto);
  }

  postGasto(gasto: GastoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, GastoAgregar>(ConstantsRoutes.GASTO_AGREGAR, gasto);
  }

  putGasto(tipoGasto: GastoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPut<string, GastoAgregar>(ConstantsRoutes.GASTO_EDITAR + `/${tipoGasto._id}`, tipoGasto);
  }

  putGastoImporte(tipoGasto: GastoAgregar): Observable<ApiResponse<string>> {
    console.log(ConstantsRoutes.GASTO_EDITAR_IMPORTE + `/${tipoGasto._id}`);
    return this.apiClient.apiPut<string, GastoAgregar>(ConstantsRoutes.GASTO_EDITAR_IMPORTE + `/${tipoGasto._id}`, tipoGasto);
  }

   // tslint:disable-next-line: variable-name
  deleteGasto(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.GASTO_ELIMINAR + `/${id}`);
  }

  postGastoDeleteFile(archivo: GastoEliminarArchivo): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, GastoEliminarArchivo>(ConstantsRoutes.GASTO_ARCHIVO_ELIMINAR, archivo);
  }

  postGastoAgregarFile(form: FormData): Observable<ApiResponse<string>> {
      return this.apiClient.apiPost<string, FormData>(ConstantsRoutes.GASTO_ARCHIVO_AGREGAR, form);
  }
}
