import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface addrSearch {
  SEARCHVAL: string,
  BLK_NO: string,
  ROAD_NAME: string,
  BUILDING: string,      
  ADDRESS: string,
  POSTAL: string,        
  X: string,   
  Y: string,   
  LATITUDE: string,
  LONGITUDE: string,
  LONGTITUDE: string
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }
  getUserBoard(v): Observable<addrSearch> {
    return this.http.get<addrSearch>(`${API_URL}search/?q=${v}`, { responseType: 'json' });
  }

  getDriverBoard(): Observable<any> {
    return this.http.get(API_URL + 'driver', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'json' });
  }
  
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${API_URL}del/${id}`)
  }
}
