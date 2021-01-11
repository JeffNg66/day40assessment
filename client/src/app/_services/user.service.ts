import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// const API_URL = 'http://localhost:3000/api/test/';
const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getDriverBoard(): Observable<any> {
    return this.http.get(API_URL + 'driver', { responseType: 'text' });
  }

  getAdminBoard(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'admin', { responseType: 'json' });
  }
  
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${API_URL}del/${id}`)
  }
}
