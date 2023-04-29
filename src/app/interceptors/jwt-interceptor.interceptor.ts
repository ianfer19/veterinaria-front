import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let decodedToken;

    if (token) {
      decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (decodedToken && !this.jwtHelper.isTokenExpired(token)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (error: any) => {
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
      )
    );
  }
}
