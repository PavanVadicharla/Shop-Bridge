import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/authentication-service';
import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean = false;
  constructor(private router: Router,
    private authService: AuthService,
    private events: EventsService) { }

  ngOnInit(): void {
    if(localStorage.getItem("logged_in") == 'true') {
      this.loggedIn = true;
    }
    this.events.subscribe("loggedIn", ()=>{
      this.loggedIn = true;
    });
    this.events.subscribe("loggedOut", ()=>{
      this.loggedIn = false;
    });
  }

  // Method used to redirect the page to login page
  public doLogin() {
    this.router.navigate(['login']);
  }

  // Method used to instantiate the authentication service logout method to perform logout
  public doLogout() {
    let sessionTimeOut = false;
    this.authService.logout(sessionTimeOut);
  }
}
