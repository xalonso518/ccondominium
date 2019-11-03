import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { TipoGastoView } from 'src/app/models/tipoGasto/tipoGastoView';
import { TipoGastoAgregar } from 'src/app/models/tipoGasto/tipoGastoAgregar';
import { TipoGastoEstado } from 'src/app/models/tipoGasto/tipoGastoEstado';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {

  constructor(private apiClient: ApiClientService) {
  }

  getTiposGastosTodos(): Observable<ApiResponse<TipoGastoView[]>> {
    return this.apiClient.apiGet<TipoGastoView[]>(ConstantsRoutes.TIPOS_GASTOS_TODOS);
  }

  getTiposGastos(): Observable<ApiResponse<TipoGastoView[]>> {
    return this.apiClient.apiGet<TipoGastoView[]>(ConstantsRoutes.TIPOS_GASTOS);
  }

  getTipoGasto(id: string): Observable<ApiResponse<TipoGastoAgregar>> {
    return this.apiClient.apiGet<TipoGastoAgregar>(ConstantsRoutes.TIPO_GASTO_GET + `/${id}`);
  }

  postTipoGasto(tipoGasto: TipoGastoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, TipoGastoAgregar>(ConstantsRoutes.TIPO_GASTO_AGREGAR, tipoGasto);
  }

  putTipoGasto(tipoGasto: TipoGastoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPut<string, TipoGastoAgregar>(ConstantsRoutes.TIPO_GASTO_EDITAR + `/${tipoGasto._id}`, tipoGasto);
  }

   // tslint:disable-next-line: variable-name
  deleteTipoGasto(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.TIPO_GASTO_ELIMINAR + `/${id}`);
  }

  cambioEstadoTipoGasto(tipoGasto: TipoGastoEstado): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, TipoGastoEstado>(ConstantsRoutes.TIPO_GASTO_CAMBIO_ESTADO, tipoGasto);
  }

}
