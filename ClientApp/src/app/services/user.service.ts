import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/users');
  }

  get(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'api/users/' + id);
  }

  create(user: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/users', user);
    
  }

  update(user: any): Observable<any> {
    return this.http.put(this.baseUrl + 'api/users', user);;
  }

  remove(id: string) {
    this.http.delete(this.baseUrl + 'api/users/' + id);
  }
}
