import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuarios } from '../../models/Usuario/usuarios';
import { ConstantsRoutes } from 'src/app/utils/constants/ConstantsRoutes';
import { ApiClientService } from 'src/app/utils/service/api-client.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/shared/ApiResponse';
import { UsuarioView } from 'src/app/models/usuario/usuarioView';
import { UsuarioAgregar } from 'src/app/models/usuario/usuarioAgregar';
import { UsuarioCambioEstado } from 'src/app/models/usuario/usuarioCambioEstado';
import { UsuarioMensaje } from 'src/app/models/usuario/usuarioMensaje';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiClient: ApiClientService) {
  }

  getUsuarios(faltantes: string): Observable<ApiResponse<UsuarioView[]>> {
    let params = new HttpParams();
    params = params.set('faltantes', faltantes);
    return this.apiClient.apiGetParam<UsuarioView[]>(ConstantsRoutes.USUARIOS_GET, params);
  }

  getUsuario(id: string): Observable<ApiResponse<UsuarioAgregar>> {
    return this.apiClient.apiGet<UsuarioAgregar>(ConstantsRoutes.USUARIO_GET + `/${id}`);
  }

  postUsuario(usuario: UsuarioAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, UsuarioAgregar>(ConstantsRoutes.USUARIO_AGREGAR, usuario);
  }

  putUsuario(usuario: UsuarioAgregar): Observable<ApiResponse<string>> {
    return this.apiClient.apiPut<string, UsuarioAgregar>(ConstantsRoutes.USUARIO_EDITAR + `/${usuario._id}`, usuario);
  }

   // tslint:disable-next-line: variable-name
  deleteUsuario(id: string): Observable<ApiResponse<string>> {
    return this.apiClient.apiDelete<string>(ConstantsRoutes.USUARIO_ELIMINAR + `/${id}`);
  }

  cambioEstadoUsuario(usuario: UsuarioCambioEstado): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, UsuarioCambioEstado>(ConstantsRoutes.USUARIO_CAMBIO_ESTADO, usuario);
  }

  mensajeUsuario(usuario: UsuarioMensaje): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, UsuarioMensaje>(ConstantsRoutes.USUARIO_ENVIAR_MENSAJE, usuario);
  }

  enviarInvitacionUsuario(usuario: UsuarioView): Observable<ApiResponse<string>> {
    return this.apiClient.apiPost<string, UsuarioView>(ConstantsRoutes.USUARIO_ENVIAR_INVITACION, usuario);
  }
}
