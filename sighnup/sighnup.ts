import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-sighnup',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './sighnup.html',
  styleUrl: './sighnup.css',
})
export class Sighnup {

 constructor( private authService:Auth){}

  signupData = {
    name: '',
    email: '',
    password: ''
  };
   
  signupMessage: string = '';

  onSignup(event: Event) {
    event.preventDefault(); // prevent form reload
    this.authService.createUser(this.signupData.email, this.signupData.password);
    this.signupMessage = 'Signup successful! You can now login.';
    console.log('Signup Data:', this.signupData);
    // Clear form
    this.signupData = { name: '', email: '', password: '' };
  }
}
