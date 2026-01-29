import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private router: Router) { }

  authUsers: { username: string; password: string }[] = [];

  private apiUrl = environment.apiUrl; // use environment variable
  // Signup: store new user
  createUser(username: string, password: string) {
    this.authUsers.push({ username, password });
    console.log('All users:', this.authUsers);
  }

  // Login: check stored users
  checkUsers(username: string, password: string): boolean {
    const matchedUser = this.authUsers.find(
      user => user.username === username && user.password === password
    );

    if (matchedUser) {
      console.log('✅ Login success');
      this.router.navigate(['home']); // navigate to home page
      return true;
    } else {
      console.log('❌ Login failed');
      return false;
    }
  }
}
