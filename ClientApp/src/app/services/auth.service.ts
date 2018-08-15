import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../DTOs/login-form';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  User: User;

  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') private baseUrl: string) {
    this.User = null;
  }

  public login(form: LoginForm) {
    this.http.post(this.baseUrl + 'api/auth/login', form).subscribe((result: any) => {
      console.log(result);
      localStorage.setItem('auth_token', result.token);
      this.User = result.User;
      this.router.navigate(['/']);
    })
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }

  public isLogged(): boolean {
    if (!!localStorage.getItem('auth_token')) {
      if (this.User == null) {
        this.getUserInfo();
      }
      return true;
    }
    return false ;
  }

  public getUserInfo() {
    this.http.get(this.baseUrl + "api/auth/user").subscribe((result: any) => {
      this.User = result.User;
      console.log(result)
    }, error => {
      this.logout();
    })
  }

  public getAccessToken() : string {
    return localStorage.getItem('auth_token');
  }
}
