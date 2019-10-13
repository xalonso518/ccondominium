import { Injectable } from '@angular/core';
import { IdentityUser } from './IdentityUser';
import { TokenDecode } from '../../models/shared/tokenDecode';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from '../service/handle-error.service';
import { ConfigService } from '../service/config.service';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../models/shared/ApiResponse';
import { ConstantsRoutes } from '../constants/ConstantsRoutes';
import { catchError } from 'rxjs/operators';
import { DatosUsuario } from 'src/app/models/Usuario/DatosUsuario';
import { ConfigCondominio } from 'src/app/models/configuracion/configCondominio';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IdentityUserService {
    private iUser: IdentityUser;
    private dUser: DatosUsuario;
    private configCondominio: ConfigCondominio;
    public openSidebar: boolean;
    baseUrl = '';

    constructor(
        private errorService: HandleErrorService,
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.baseUrl = configService.getApiURI();
    }

    // Obtiene datos del usuario de la API con el Token del usuario
    public getApiIdentityUser(UserName: string): Observable<ApiResponse<IdentityUser>> {
        const BearerToken = localStorage.getItem('token');
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.post<ApiResponse<IdentityUser>>(
            this.baseUrl + ConstantsRoutes.IDENTITY_USER,
            { UserName },
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
        );
    }

    // Obtiene datos del usuario de la API con el Token del usuario
    public getApiDataUser(UserName: string): Observable<ApiResponse<DatosUsuario>> {
        const BearerToken = localStorage.getItem('token');
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.post<ApiResponse<DatosUsuario>>(
            this.baseUrl + ConstantsRoutes.NAVBAR_USER,
            { UserName },
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

    // Obtiene datos del usuario de la API con el Token del usuario
    public getApiConfigCondominio(UserName: string): Observable<ApiResponse<ConfigCondominio>> {
        const BearerToken = localStorage.getItem('token');
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.post<ApiResponse<ConfigCondominio>>(
            this.baseUrl + ConstantsRoutes.CONFIG_CONDOMINIO,
            { UserName },
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
        );
    }

    // Crea IdentityUser con un objeto TokenDecode
    createIdentityUser(token: TokenDecode): boolean {
        if (token != null && token.userId !== 'NA') {
            this.iUser = new IdentityUser(
                token.userId,
                token.user,
                token.tipo
            );
            return true;
        }
        return false;
    }

    // Limpia el objeto iUser
    resetIdentityUser(): boolean {
        this.iUser = new IdentityUser('', '', '');
        if (this.iUser.user === '') { return true; }
        return false;
    }

    getIdentityUser(): IdentityUser {
        return this.iUser;
    }

    getUserId(): string {
        return this.iUser != null ? this.iUser.userId : '';
    }

    getUserTipo(): string {
        return this.iUser != null ? this.iUser.tipo : '';
    }

    getUserUser(): string {
        return this.iUser != null ? this.iUser.user : '';
    }

    /**
     * Limpia el objeto dUser
     */
    resetDatosUser(): boolean {
        this.dUser = new DatosUsuario('NA', '', '');
        if (this.dUser.nombre === 'NA') { return true; }
        return false;
    }

    /**
     * Crea DataUser con un objeto DatosUser
     */
    createDatosUser(dUser: DatosUsuario) {
        this.dUser = dUser;
        if (dUser.imagen !== undefined && dUser.imagen !== '') { this.dUser.imagen = this.configService.getApiURI() + '/' + dUser.imagen; }
    }

    getDatosUser(): DatosUsuario {
        return this.dUser;
    }

    setImagePerfil(img: string) {
        this.dUser.imagen = this.configService.getApiURI() + '/' + img;
    }

    setNombre(nombre: string) {
        if (this.dUser != null) { this.dUser.nombre = nombre; }
    }

    setCasa(casa: string) {
        if (this.dUser != null) { this.dUser.casa = casa; }
    }

    /**
     * Crea Config con un objeto config
     */
    createConfig(config: ConfigCondominio) {
        this.configCondominio = config;
    }

    getConfig(): ConfigCondominio {
        return this.configCondominio;
    }

    setConfigNombre(nombre: string) {
        this.configCondominio.nombre = nombre;
    }

    setConfigCuota(cuota: number) {
        if (this.configCondominio != null) { this.configCondominio.cuotaMensual = cuota; }
    }

    setConfigOtroCuota(cuota: number) {
        if (this.configCondominio != null) { this.configCondominio.otroCuotaMensual = cuota; }
    }

}
