
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class HandleErrorService {
    constructor() {

    }

    public handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            return throwError('Error en el cliente ' + error);
        }
        if (error.status === 401 || (error.status === 200 && !error.ok && error.error)) {
            const errorAutorizacion = 'Usuario sin autorización';
            return throwError({ error: errorAutorizacion });
        }
        return throwError(error.error);
    }

}
