import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PersonaComponent } from './components/persona/persona.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MenuModule } from './menu/menu.module'
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    PersonaComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxFileDropModule,
    MenuModule,
    CoreModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
