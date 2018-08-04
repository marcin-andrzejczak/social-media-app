import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../DTOs/login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') private baseUrl: string) { }

  public login(form: LoginForm) {
    this.http.post(this.baseUrl + 'api/users/authenticate', form).subscribe((result: any) => {
      console.log(result);
      localStorage.setItem('auth_token', result.token);
      this.router.navigate(['/']);
    })
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }

  public isLogged() : boolean {
    return !!localStorage.getItem('auth_token');
  }

  public getAccessToken() : string {
    return localStorage.getItem('auth_token');
  }
}
