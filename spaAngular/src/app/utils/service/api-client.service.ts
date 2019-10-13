import { Injectable, isDevMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ApiResponse } from '../../models/shared/ApiResponse';
import { HandleErrorService } from './handle-error.service';
import { ConfigService } from './config.service';

@Injectable()
export class ApiClientService {

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private errorService: HandleErrorService) {
    }

    public apiGet<T>(url: string): Observable<ApiResponse<T>> {
        const BearerToken = localStorage.getItem('token');
        const httpOptions = { headers: new HttpHeaders()};
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.get<ApiResponse<T>>(
            this.configService.getApiURI() + url,
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

    public apiGetParam<T>(url: string, params: HttpParams): Observable<ApiResponse<T>> {
        const BearerToken = localStorage.getItem('token');
        const httpOptions = { headers: new HttpHeaders(), params: new HttpParams() };
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);
        httpOptions.params = params;

        return this.http.get<ApiResponse<any>>(
            this.configService.getApiURI() + url,
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

    public apiPost<T, O>(url: string, object: O): Observable<ApiResponse<T>> {
        const BearerToken = localStorage.getItem('token');
        const httpOptions = { headers: new HttpHeaders() };
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.post<ApiResponse<T>>(
            this.configService.getApiURI() + url,
            object,
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

    public apiPut<T, O>(url: string, object: O): Observable<ApiResponse<T>> {
        const BearerToken = localStorage.getItem('token');
        const httpOptions = { headers: new HttpHeaders() };
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.put<ApiResponse<T>>(
            this.configService.getApiURI() + url,
            object,
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

    public apiDelete<T>(url: string): Observable<ApiResponse<T>> {
        const BearerToken = localStorage.getItem('token');
        const httpOptions = { headers: new HttpHeaders(), params: new HttpParams() };
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);

        return this.http.delete<ApiResponse<any>>(
            this.configService.getApiURI() + url,
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

    public apiDeleteParams<T>(url: string, params: HttpParams): Observable<ApiResponse<T>> {
        const BearerToken = localStorage.getItem('token');
        const httpOptions = { headers: new HttpHeaders(), params: new HttpParams() };
        httpOptions.headers = httpOptions.headers.set('x-access-token', BearerToken);
        httpOptions.params = params;

        return this.http.delete<ApiResponse<any>>(
            this.configService.getApiURI() + url,
            httpOptions
        ).pipe(
            catchError(this.errorService.handleError)
            );
    }

}
