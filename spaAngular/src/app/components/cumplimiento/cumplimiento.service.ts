import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { CumplimientoAgregar } from 'src/app/models/cumplimiento/cumplimientoAgregar';
import { CumplimientoSimpleView } from 'src/app/models/cumplimiento/cumplimientoSimpleView';
import { CumplimientoView } from 'src/app/models/cumplimiento/cumplimientoView';

@Injectable({
  providedIn: 'root'
})
export class CumplimientoService {

  constructor(private apiClient: ApiClientService) {
  }

  getCumplimientos(anio: number, mes: number, tipo: string): Observable<ApiResponse<CumplimientoSimpleView[]>> {
    let params = new HttpParams();
    params = params.set('anio', anio.toString());
    params = params.set('mes', mes.toString());
    params = params.set('tipo', tipo);
    return this.apiClient.apiGetParam<CumplimientoSimpleView[]>(ConstantsRoutes.CUMPLIMIENTOS, params);
  }

  getCumplimiento(id: string): Observable<ApiResponse<CumplimientoView>> {
    return this.apiClient.apiGet<CumplimientoView>(ConstantsRoutes.CUMPLIMIENTO_GET + `/${id}`);
  }

  postCumplimiento(cumplimiento: CumplimientoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, CumplimientoAgregar>(ConstantsRoutes.CUMPLIMIENTO_AGREGAR, cumplimiento);
  }

  putCumplimiento(tipoCumplimiento: CumplimientoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPut<string, CumplimientoAgregar>(ConstantsRoutes.CUMPLIMIENTO_EDITAR + `/${tipoCumplimiento._id}`, tipoCumplimiento);
  }

   // tslint:disable-next-line: variable-name
  deleteCumplimiento(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.CUMPLIMIENTO_ELIMINAR + `/${id}`);
  }
}
