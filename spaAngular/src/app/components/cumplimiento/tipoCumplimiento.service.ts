import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { TipoCumplimientoView } from 'src/app/models/tipoCumplimiento/tipoCumplimientoView';
import { TipoCumplimientoAgregar } from 'src/app/models/tipoCumplimiento/tipoCumplimientoAgregar';
import { TipoCumplimientoEstado } from 'src/app/models/tipoCumplimiento/tipoCumplimientoEstado';

@Injectable({
  providedIn: 'root'
})
export class TipoCumplimientoService {

  constructor(private apiClient: ApiClientService) {
  }

  getTiposCumplimientosTodos(): Observable<ApiResponse<TipoCumplimientoView[]>> {
    return this.apiClient.apiGet<TipoCumplimientoView[]>(ConstantsRoutes.TIPOS_CUMPLIMIENTOS_TODOS);
  }

  getTiposCumplimientos(): Observable<ApiResponse<TipoCumplimientoView[]>> {
    return this.apiClient.apiGet<TipoCumplimientoView[]>(ConstantsRoutes.TIPOS_CUMPLIMIENTOS);
  }

  getTipoCumplimiento(id: string): Observable<ApiResponse<TipoCumplimientoAgregar>> {
    return this.apiClient.apiGet<TipoCumplimientoAgregar>(ConstantsRoutes.TIPO_CUMPLIMIENTO_GET + `/${id}`);
  }

  postTipoCumplimiento(tipoCumplimiento: TipoCumplimientoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, TipoCumplimientoAgregar>(ConstantsRoutes.TIPO_CUMPLIMIENTO_AGREGAR, tipoCumplimiento);
  }

  putTipoCumplimiento(tipoCumplimiento: TipoCumplimientoAgregar): Observable<ApiResponse<string>> {
    // tslint:disable-next-line: max-line-length
    return this.apiClient.apiPut<string, TipoCumplimientoAgregar>(ConstantsRoutes.TIPO_CUMPLIMIENTO_EDITAR + `/${tipoCumplimiento._id}`, tipoCumplimiento);
  }

   // tslint:disable-next-line: variable-name
  deleteTipoCumplimiento(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.TIPO_CUMPLIMIENTO_ELIMINAR + `/${id}`);
  }

  cambioEstadoTipoCumplimiento(tipoCumplimiento: TipoCumplimientoEstado): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, TipoCumplimientoEstado>(ConstantsRoutes.TIPO_CUMPLIMIENTO_CAMBIO_ESTADO, tipoCumplimiento);
  }

}
