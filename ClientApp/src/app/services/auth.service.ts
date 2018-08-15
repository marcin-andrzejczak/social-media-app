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
      this.User = new User(
        result.id,
        result.firstName,
        result.lastName,
        result.profilePictureUrl
      );
      debugger;
    })
    debugger;
    this.router.navigate(['/']);
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
      console.log("User is logged in! [USER]: ");
      console.log(this.User);
      return true;
    }
    console.log("User is not logged in");
    return false ;
  }

  public getUserInfo() {
    this.http.get(this.baseUrl + "api/auth/user").subscribe((result: any) => {
      this.User = new User(
        result.id,
        result.firstName,
        result.lastName,
        result.profilePictureUrl
      );
      console.log(result)
    }, error => {
      this.logout();
      })
  }

  public getAccessToken() : string {
    return localStorage.getItem('auth_token');
  }

  public getCurrentUserFullName(): string {
    if (this.User != null) { 
      return this.User.FirstName + " " + this.User.LastName;
    } else {
      return "";
    }
  }

  public getCurrentUserProfilePictureUrl(): string {
    if (this.User != null) {
      return this.User.ProfilePictureUrl;
    } else {
      return "";
    }
  }
}
