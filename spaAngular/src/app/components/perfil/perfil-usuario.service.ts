import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsRoutes } from '../../utils/constants/ConstantsRoutes';
import { ApiResponse } from '../../models/shared/ApiResponse';
import { PerfilUser } from '../../models/usuario/PerfilUser';
import { DatosUsuario } from '../../models/usuario/datosUsuario';
import { ApiClientService } from '../../utils/service/api-client.service';
import { Usuarios } from '../../models/usuario/usuarios';

@Injectable()
export class PerfilUsuarioService {

    constructor(
        private apiClient: ApiClientService
    ) {

    }

    public uploadFileProfile(form: FormData, dir: string, id: string): Observable<ApiResponse<string>> {
        return this.apiClient.apiPost<string, FormData>(ConstantsRoutes.PERFIL_USER_FILE + `/${dir}` + `/${id}`, form);
    }

    public uploadProfile(id: string, perfil: PerfilUser): Observable<ApiResponse<string>> {
        return this.apiClient.apiPut<string, PerfilUser>(ConstantsRoutes.PERFIL_USER + `/${id}`, perfil);
    }

    public getProfile(id: string): Observable<ApiResponse<PerfilUser>> {
        return this.apiClient.apiGet<PerfilUser>(ConstantsRoutes.PERFIL_USER + `/${id}`);
    }

    public borrarImagenProfile(id: string, dui: any): Observable<ApiResponse<string>> {
        return this.apiClient.apiPost<string, string>(ConstantsRoutes.PERFIL_BORRAR_IMG  + '/' + id, dui);
    }

}
