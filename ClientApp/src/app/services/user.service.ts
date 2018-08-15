import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterForm } from '../DTOs/register-form';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'api/users');
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/users/' + id);
  }

  create(user: RegisterForm): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'api/users', user);
    
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'api/users', user);;
  }

  remove(id: string) {
    this.http.delete(this.baseUrl + 'api/users/' + id);
  }
}
