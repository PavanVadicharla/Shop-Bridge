import { Router, NavigationEnd, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './authentication-service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router,
        private authService: AuthService,
        private flashMessages: FlashMessagesService
        ) {

    }
        
    canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|UrlTree {
        if (!this.authService.isUserLoggedIn()) {
            this.flashMessages.show('Please login to access the cart!', {
                cssClass: 'alert-danger',
                timeout: 4000
            });
            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;
        } 
        return true;
    }
}