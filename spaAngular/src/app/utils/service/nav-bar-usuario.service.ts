import { Injectable } from '@angular/core';
import { TokenDecode } from '../../models/shared/tokenDecode';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorService } from '../service/handle-error.service';
import { ConfigService } from '../service/config.service';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../models/shared/ApiResponse';
import { ConstantsRoutes } from '../constants/ConstantsRoutes';
import { catchError } from 'rxjs/operators';
import { IdentityUserService } from '../IdentityUser/identity-user.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NavBarUsuarioService {
    constructor(
        private identityUserService: IdentityUserService
    ) {

    }

    public setDataUser() {
       this.identityUserService.getApiDataUser(this.identityUserService.getUserUser()).subscribe(
           user => {
               if (user.success) {
                   this.identityUserService.createDatosUser(user.payload);
               } else { alert('Error al cargar los datos de usuario'); }

           }
           , error => {
               alert('Error al cargar los datos de usuario');
           }
       );
    }

}
