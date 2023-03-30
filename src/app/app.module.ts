import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { AuthComponent } from './components/auth/auth.component';
import { PersonaComponent } from './components/persona/persona.component';
import { BarraComponent } from './components/barra/barra.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    AuthComponent,
    PersonaComponent,
    BarraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
