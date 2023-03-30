import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(auth: any){
    return this.http.post<any>(`${this.apiServerUrl}/auth/authenticate`, auth)
  }

  getToken(){
    return localStorage.getItem('token');
  }
}

