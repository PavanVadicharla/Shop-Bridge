import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public invalidCredentials: boolean = false;
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)]],
            stayLoggedIn: ['']
        });
    }

    ngOnInit() {
    }

    // convenience getter for easy access to form fields
    get formField() { 
        return this.loginForm.controls; 
    }

    // Method which is used to instantiate the authentication service for login
    onSubmit() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.stayLoggedIn);
    }
}
