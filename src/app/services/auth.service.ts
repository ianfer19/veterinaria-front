import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Auth } from '../interfaces/Auth';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  login(auth: any){
    return this.http.post<any>(`${this.apiServerUrl}/auth/authenticate`, auth, {
      observe: 'response'
    }).pipe(map((response:HttpResponse<any>) =>{
      const body= response.body.token;
      localStorage.setItem('token', body);

      return body;
    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(token: any){
    return this.http.post<any>(`${this.apiServerUrl}/auth/logout`, token);
  }


  ValidarToken(parametro:string){
    return this.http.get(`http://localhost:8080/api/auth/token?token=${parametro}`,{
      observe: 'response'
    }).pipe(map((response:HttpResponse<any>) =>{
      const body= response.body;
      localStorage.setItem('tokenValid', body);
      console.log(body)
      return body;
    }))
}
}

