import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../DTOs/login-form';
import { User } from '../models/user.model';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = new Subject<boolean>();
  User: User;

  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') private baseUrl: string) {
    this.logged.next(false);
    this.getUserInfo();
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
      this.logged.next(true);
    })
    this.router.navigate(['/']);
  }

  public logout() {
    this.clearUser();
    this.router.navigate(['/']);
  }

  public isLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }

  public getUserInfo() {
    if (!!this.getAccessToken()) {
      this.http.get(this.baseUrl + "api/auth/user")
        .pipe(
          catchError(err => {
            if (err.status == 401) {
              this.logout();
              return EMPTY;
            }
          })
        ).subscribe((result: any) => {
          this.User = new User(
            result.id,
            result.firstName,
            result.lastName,
            result.profilePictureUrl
          );
          this.logged.next(true);
        })
    } else {
      this.clearUser();
    }
  }

  private clearUser() {
    this.removeAccessToken();
    this.User = null;
    this.logged.next(false);
  }

  public getAccessToken() : string {
    return localStorage.getItem('auth_token');
  }

  public removeAccessToken() {
    localStorage.removeItem('auth_token');
  }

  public getCurrentUserFullName(): string {
    return this.User != null ? this.User.FirstName + " " + this.User.LastName : "";
  }

  public getCurrentUserProfilePictureUrl(): string {
    return this.User != null ? this.User.ProfilePictureUrl : "";
  }
}
