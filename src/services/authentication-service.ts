import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventsService } from 'angular4-events';
import { UserService } from './user-service';
 
@Injectable()
export class AuthService { 
 
    private userName:string ='';
    public retUrl: string = 'home';
    public validCredentials: any;
    constructor(private router: Router,
        private flashMessages: FlashMessagesService,
        public events: EventsService,
        private userService: UserService) {
    }
 
    /**
     * Method to do login the customer based on the below params
     * @param username username of the admin user
     * @param password password of the admin user
     * @param stayLoggedIn selected option for the keep me logged in
     */
    login(username: string, password: string, stayLoggedIn: string) {
        this.validCredentials = localStorage.getItem("login_credentials");
        this.validCredentials = JSON.parse(this.validCredentials);
        if (username != this.validCredentials.username || password != this.validCredentials.password) {
            this.flashMessages.show('Invalid username or password credentials!', {
                cssClass: 'alert-danger',
                timeout: 4000
            });
        } else {
            localStorage.setItem("logged_in", "true");
            if(!stayLoggedIn){
                this.userService.setSession();
            } else {
                localStorage.setItem('keep_me_logged_in', "true");
                localStorage.removeItem("session_timeout");
            }
            this.events.publish("loggedIn");
            this.flashMessages.show('You are now logged in!', {
                cssClass: 'alert-success',
                timeout: 4000
            });
            if (this.retUrl!=null) {
                this.router.navigate( [this.retUrl]);
            } else {
                this.router.navigate( ['home']);
            }
        }
    }
    /**
     * Method to check if the user is logged in or not
     * @returns true if logged in else fasle
     */
    isUserLoggedIn() {
        if(localStorage.getItem("logged_in") == "true") {
            let todayDate = new Date();
            let presentTimeInMS = todayDate.getTime();
            if(localStorage.getItem("keep_me_logged_in") == "false") {
                if(presentTimeInMS > this.userService.getSession()) {
                    let sessionTimeOut = true;
                    this.logout(sessionTimeOut);
                }
            }
            return true;
        } else {
            return false;
        }
    }
     /**
     * Method to check if the user logged is admin or not
     * @returns true if admin user else fasle
     */
    isAdminUser() {
        if (this.userName=='admin') {
            return true; 
        }
        return false;
    }
    /**
     * Method to perform the logout of the logged in admin user
     * @param session_timeout if the session_timeout is passed as true 
     * then the user will be logged out with session timed out info 
     * message else Admin user performed logged out.
     */
    logout(session_timeout: boolean){
        localStorage.setItem("logged_in", "false");
        this.events.publish("loggedOut");
        localStorage.setItem('keep_me_logged_in', "false");
        if (session_timeout) {
            this.flashMessages.show('Session timed out. Please login again to access the cart!', {
                cssClass: 'alert-danger',
                timeout: 4000
            });
        } else {
            this.flashMessages.show('You are now logged out!', {
                cssClass: 'alert-danger',
                timeout: 4000
            });
        }
        this.router.navigate(['login']);
    }
} 