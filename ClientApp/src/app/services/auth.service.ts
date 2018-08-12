import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../DTOs/login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Id: string = "";
  FirstName: string = "";
  LastName: string = "";
  ProfilePicture: string = "";

  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') private baseUrl: string) { }

  public login(form: LoginForm) {
    this.http.post(this.baseUrl + 'api/auth/login', form).subscribe((result: any) => {
      console.log(result);
      localStorage.setItem('auth_token', result.token);
      this.Id = result.Id;
      this.FirstName = result.firstName;
      this.LastName = result.lastName;
      this.ProfilePicture = result.profilePicture;
      this.router.navigate(['/']);
    })
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }

  public isLogged(): boolean {
    // TODO: Make auth check for status on endpoint rather than existence of auth_token key in local storage
    //this.http.get(this.baseUrl + 'api/auth/status').subscribe( (result: any) => {
    //  console.log(result);
    //  debugger;
    //  return true;
    //});
    return !!localStorage.getItem('auth_token');
  }

  public getUserInfo() {
    this.http.get(this.baseUrl + "api/auth/user").subscribe((result: any) => {
      this.Id = result.Id;
      this.FirstName = result.FirstName;
      this.LastName = result.LastName;
      this.ProfilePicture = result.ProfilePicture;
    })
  }

  public getAccessToken() : string {
    return localStorage.getItem('auth_token');
  }
}
