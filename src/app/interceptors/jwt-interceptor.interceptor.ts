import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.ValidarToken();
          const authReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          });

          return next.handle(authReq);
    }

    this.router.navigate(['/login']);
    return next.handle(request);
  }
}
