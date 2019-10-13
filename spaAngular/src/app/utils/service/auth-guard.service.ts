import { Injectable } from '@angular/core';
import {
    ActivatedRoute,
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { SessionService } from './session.service';
import { ToastrService } from 'ngx-toastr';
import { ConstantsRoutes } from '../constants/ConstantsRoutes';
import { IdentityUserService } from '../IdentityUser/identity-user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private sessionService: SessionService,
        private toastr: ToastrService,
        private iUserService: IdentityUserService
    ) {

    }

    removeModalFromUrl(url: string): string {
        return url = url.replace('(modal:perfil)', '');
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let url: string = state.url;
        url = this.removeModalFromUrl(url);

        // Validar token, session, rol
        if (this.sessionService.isTokenSet()) {
            if (this.sessionService.isTokenActive()) {
                if (this.sessionService.isAuthenticated()) {
                    if (state.url.split('/')[1] === 'admin') {
                        if (this.iUserService.getUserTipo() === 'admin') { return true; } else { return false; }
                    } else {
                        return true;
                    }
                } else {
                    this.sessionService.sessionRedirect(ConstantsRoutes.ANGULAR_LOGIN, encodeURI(url));
                }
            } else {
                this.sessionService.logout();
            }
        } else {
            this.sessionService.sessionRedirect(ConstantsRoutes.ANGULAR_LOGIN, encodeURI(url));
        }
        return false;
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.sessionService.isTokenSet() && this.sessionService.isTokenActive) {

        } else {
            this.sessionService.logout();

            return false;
        }

        return false;
    }

}
