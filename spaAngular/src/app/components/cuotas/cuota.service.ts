import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { TipoCuotaView } from 'src/app/models/tipoCuota/tipoCuotaView';
import { TipoCuotaAgregar } from 'src/app/models/tipoCuota/tipoCuotaAgregar';
import { TipoCuotaEstado } from 'src/app/models/tipoCuota/tipoCuotaEstado';
import { CuotaAgregar } from 'src/app/models/cuota/cuotaAgregar';
import { CuotaSimpleView } from 'src/app/models/cuota/cuotaSimpleView';
import { CuotaView } from 'src/app/models/cuota/cuotaView';
import { CuotaEliminarArchivo } from 'src/app/models/cuota/cuotaEliminarArchivo';
import { ImportarXmlResponse } from 'src/app/models/file/ImportarXmlResponse';
import { CuotaFaltante } from 'src/app/models/cuota/cuotaFaltante';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  constructor(private apiClient: ApiClientService) {
  }

  getCuotas(anio: number, mI: number, mF: number, tipos: string[]): Observable<ApiResponse<CuotaSimpleView[]>> {
    let params = new HttpParams();
    params = params.set('anio', anio.toString());
    params = params.set('mI', mI.toString());
    params = params.set('mF', mF.toString());
    params = params.set('tipos', tipos.join('@'));
    return this.apiClient.apiGetParam<CuotaSimpleView[]>(ConstantsRoutes.CUOTAS, params);
  }

  getCuota(id: string): Observable<ApiResponse<CuotaView>> {
    return this.apiClient.apiGet<CuotaView>(ConstantsRoutes.CUOTA_GET + `/${id}`);
  }

  postCuotaFile(cuota: FormData): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, FormData>(ConstantsRoutes.CUOTA_AGREGAR_FILE, cuota);
  }

  postCuota(cuota: CuotaAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, CuotaAgregar>(ConstantsRoutes.CUOTA_AGREGAR, cuota);
  }

  putCuota(tipoCuota: CuotaAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPut<string, CuotaAgregar>(ConstantsRoutes.CUOTA_EDITAR + `/${tipoCuota._id}`, tipoCuota);
  }

  putCuotaImporte(tipoCuota: CuotaAgregar): Observable<ApiResponse<string>> {
    console.log(ConstantsRoutes.CUOTA_EDITAR_IMPORTE + `/${tipoCuota._id}`);
    return this.apiClient.apiPut<string, CuotaAgregar>(ConstantsRoutes.CUOTA_EDITAR_IMPORTE + `/${tipoCuota._id}`, tipoCuota);
  }

   // tslint:disable-next-line: variable-name
  deleteCuota(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.CUOTA_ELIMINAR + `/${id}`);
  }

  postCuotaDeleteFile(archivo: CuotaEliminarArchivo): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, CuotaEliminarArchivo>(ConstantsRoutes.CUOTA_ARCHIVO_ELIMINAR, archivo);
  }

  postCuotaAgregarFile(form: FormData): Observable<ApiResponse<string>> {
      return this.apiClient.apiPost<string, FormData>(ConstantsRoutes.CUOTA_ARCHIVO_AGREGAR, form);
  }

  getCuotasFaltantes(anio: number, mes: number, tipo: string): Observable<ApiResponse<CuotaFaltante>> {
    let params = new HttpParams();
    params = params.set('anio', anio.toString());
    params = params.set('mes', mes.toString());
    params = params.set('tipo', tipo);
    return this.apiClient.apiGetParam<CuotaFaltante>(ConstantsRoutes.CUOTAS_FALTANTES, params);
  }
}
