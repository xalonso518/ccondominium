import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../../utils/service/config.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// Statics
import { ApiResponse } from '../../models/shared/ApiResponse';
import { TokenResponse } from '../../models/auth/TokenResponse';
import { Login } from '../../models/auth/login';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from '../../utils/service/handle-error.service';
import { ConstantsRoutes } from '../../utils/constants/ConstantsRoutes';
import { RegistroForm } from '../../models/auth/registroForm';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
    baseUrl = '';
    private loggedIn = false;

    constructor(
        private toastr: ToastrService,
        private errorService: HandleErrorService,
        private http: HttpClient,
        private configService: ConfigService) {
        this.baseUrl = configService.getApiURI();
    }

    login(NameUser: string, PasswordHat: string): Observable<ApiResponse<TokenResponse>> {
        const loginUser = new Login(NameUser, PasswordHat);
        return this.http.post<ApiResponse<TokenResponse>>(
            this.baseUrl + ConstantsRoutes.LOGIN,
            loginUser,
            httpOptions
            )
            .pipe(
            tap((result: ApiResponse<TokenResponse>) => {
                console.log('Reultado: ' + result);
            }),
            catchError(this.errorService.handleError)
        );
    }

    reset(email: string): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            this.baseUrl + ConstantsRoutes.RESET,
            { email },
            httpOptions
        )
            .pipe(
            tap((result: ApiResponse<boolean>) => {
                console.log('Reultado: ' + result);
            }),
            catchError(this.errorService.handleError)
            );
    }

    registro(form: RegistroForm): Observable<ApiResponse<object>> {
        return this.http.post<ApiResponse<object>>(
            this.baseUrl + ConstantsRoutes.REGISTRO,
            form,
            httpOptions
            ).pipe(
                catchError(this.errorService.handleError)
            );
    }

}
