import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { TipoCuotaAgregar } from 'src/app/models/tipoCuota/tipoCuotaAgregar';
import { TipoCuotaEstado } from 'src/app/models/tipoCuota/tipoCuotaEstado';

@Injectable({
  providedIn: 'root'
})
export class TipoCuotaService {

  constructor(private apiClient: ApiClientService) {
  }

  getTiposCuotasTodos(): Observable<ApiResponse<TipoCuotaView[]>> {
    return this.apiClient.apiGet<TipoCuotaView[]>(ConstantsRoutes.TIPOS_CUOTAS_TODOS);
  }

  getTiposCuotas(): Observable<ApiResponse<TipoCuotaView[]>> {
    return this.apiClient.apiGet<TipoCuotaView[]>(ConstantsRoutes.TIPOS_CUOTAS);
  }

  getTipoCuota(id: string): Observable<ApiResponse<TipoCuotaAgregar>> {
    return this.apiClient.apiGet<TipoCuotaAgregar>(ConstantsRoutes.TIPO_CUOTA_GET + `/${id}`);
  }

  postTipoCuota(tipoCuota: TipoCuotaAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, TipoCuotaAgregar>(ConstantsRoutes.TIPO_CUOTA_AGREGAR, tipoCuota);
  }

  putTipoCuota(tipoCuota: TipoCuotaAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPut<string, TipoCuotaAgregar>(ConstantsRoutes.TIPO_CUOTA_EDITAR + `/${tipoCuota._id}`, tipoCuota);
  }

   // tslint:disable-next-line: variable-name
  deleteTipoCuota(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.TIPO_CUOTA_ELIMINAR + `/${id}`);
  }

  cambioEstadoTipoCuota(tipoCuota: TipoCuotaEstado): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, TipoCuotaEstado>(ConstantsRoutes.TIPO_CUOTA_CAMBIO_ESTADO, tipoCuota);
  }

}
