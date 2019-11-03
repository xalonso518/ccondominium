import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { CumplimientoAgregar } from 'src/app/models/cumplimiento/cumplimientoAgregar';
import { CumplimientoSimpleView } from 'src/app/models/cumplimiento/cumplimientoSimpleView';
import { CumplimientoView } from 'src/app/models/cumplimiento/cumplimientoView';
import { ConfigCondominio } from 'src/app/models/configuracion/configCondominio';
import { BitacoraView } from 'src/app/models/condominio/bitacoraView';
import { AvisoView } from 'src/app/models/condominio/avisoView';
import { MensajeView } from 'src/app/models/condominio/mensajeView';
import { AvisoAgregar } from 'src/app/models/condominio/avisoAgregar';
import { TipoCumplimientoAgregar } from 'src/app/models/tipoCumplimiento/tipoCumplimientoAgregar';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  constructor(private apiClient: ApiClientService) {
  }

  getBitacoras(sf1: Date, sf2: Date): Observable<ApiResponse<BitacoraView[]>> {
    let params = new HttpParams();
    params = params.set('fechaInicio', sf1.toString());
    params = params.set('fechaFinal', sf2.toString());
    //params = params.set('fechaInicio', (sf1.getUTCMonth() + 1).toString() + '/' + sf1.getUTCDate().toString() + '/' + sf1.getUTCFullYear());
    //params = params.set('fechaFinal', (sf2.getUTCMonth() + 1).toString() + '/' + sf2.getUTCDate().toString() + '/' + sf2.getUTCFullYear());
    return this.apiClient.apiGetParam<BitacoraView[]>(ConstantsRoutes.CONDOMINIO_BITACORA, params);
  }

  putConfig(bitacora: ConfigCondominio): Observable<ApiResponse<string>> {
    // tslint:disable-next-line: max-line-length
    return this.apiClient.apiPut<string, ConfigCondominio>(ConstantsRoutes.CONFIG_CONDOMINIO_EDITAR + `/${bitacora._id}`, bitacora);
  }

  getMensajes(sf1: Date, sf2: Date): Observable<ApiResponse<MensajeView[]>> {
    let params = new HttpParams();
    params = params.set('fechaInicio', sf1.toString());
    params = params.set('fechaFinal', sf2.toString());
    //params = params.set('fechaInicio', (sf1.getUTCMonth() + 1).toString() + '/' + sf1.getUTCDate().toString() + '/' + sf1.getUTCFullYear());
    //params = params.set('fechaFinal', (sf2.getUTCMonth() + 1).toString() + '/' + sf2.getUTCDate().toString() + '/' + sf2.getUTCFullYear());
    return this.apiClient.apiGetParam<MensajeView[]>(ConstantsRoutes.CONDOMINIO_MENSAJES, params);
  }

  getAvisos(sf1: Date, sf2: Date): Observable<ApiResponse<AvisoView[]>> {
    let params = new HttpParams();
    params = params.set('fechaInicio', sf1.toString());
    params = params.set('fechaFinal', sf2.toString());
    //params = params.set('fechaInicio', (sf1.getUTCMonth() + 1).toString() + '/' + sf1.getUTCDate().toString() + '/' + sf1.getUTCFullYear());
    //params = params.set('fechaFinal', (sf2.getUTCMonth() + 1).toString() + '/' + sf2.getUTCDate().toString() + '/' + sf2.getUTCFullYear());
    return this.apiClient.apiGetParam<AvisoView[]>(ConstantsRoutes.CONDOMINIO_AVISOS, params);
  }

  postAviso(aviso: AvisoAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, AvisoAgregar>(ConstantsRoutes.CONDOMINIO_AVISO_AGREGAR, aviso);
  }
}
