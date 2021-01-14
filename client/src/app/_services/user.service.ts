import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface AddrSearch {
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
  LONGTITUDE?: string
}

export interface AddrPicked {
  lat: number,
  lng: number
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// const API_URL = 'http://localhost:3000/api/';
const API_URL = `${environment.api_url}/api/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // lat: number = 1.29795856720987
  // lng: number = 103.787435440348

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getOneMap(v): Observable<AddrSearch> {
    return this.http.get<AddrSearch>(`${API_URL}search/?q=${v}`, { responseType: 'json' });
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
