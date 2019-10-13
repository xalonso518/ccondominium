import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ConstantsRoutes } from '../constants/ConstantsRoutes';
import { ApiResponse } from '../../models/shared/ApiResponse';
import { ApiClientService } from './api-client.service';

@Injectable()
export class CatalogosService {

    constructor(
        private apiClient: ApiClientService
    ) {
    }
}
