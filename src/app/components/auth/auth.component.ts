import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from 'src/app/interfaces/Auth';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor (private authService: AuthService){}

  auth :Auth={
    email: '',
    password: '',
  }

  ngOnInit(){
  }

  login(form:NgForm){
  this.authService.login(this.auth)
  .subscribe(data => localStorage.setItem('token', data.token));
  this.authService.login(this.auth)
}
}
