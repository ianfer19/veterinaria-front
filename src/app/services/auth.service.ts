import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Auth } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) { }

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


  ValidarToken(){
    const parametro = localStorage.getItem('token');
    const url = `http://localhost:8080/api/auth/token?token=${parametro}`;
    let valido=undefined;
this.http.get(url).subscribe((resultado) => {
    valido=resultado;
    if(valido===false){
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
    }
});
  }
}

