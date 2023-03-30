import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { GuardAuthGuard } from './guards/guard-auth.guard';

const routes: Routes = [
  {
    path:'login',
    component: AuthComponent
  },
  {
    path:'paciente',
    component: PacientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
