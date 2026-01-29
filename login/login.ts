import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router,
    private http: HttpClient,
    private authService: Auth
  ) { }

  loginData = {
    email: '',
    password: ''
  };
  loginError: string = '';


  onLogin(event: Event) {
    event.preventDefault(); // prevent form reload
    const success = this.authService.checkUsers(this.loginData.email, this.loginData.password);

    if (!success) {
      this.loginError = 'Invalid credentials, please try again!';
    } else {
      this.loginError = '';
    }

    console.log('Login Data:', this.loginData);
  }


}
