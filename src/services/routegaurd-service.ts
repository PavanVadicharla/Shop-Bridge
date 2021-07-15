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
    
    /**
     * Method which is executed as a gaurd for all the routes specified and specifically to check 
     * whether the admin user is logged in or not. If not redirects the admin to login page or else
     * redirects to the accessed page 
     * @param route route which is accessed
     * @returns 
     */
    canActivate(route: ActivatedRouteSnapshot): boolean|UrlTree {
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