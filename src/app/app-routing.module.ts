import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './login/components/auth/auth.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { GuardAuthGuard } from './guards/guard-auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaPacienteComponent } from './components/persona-paciente/persona-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/pacientes'
      },
      {
        path: 'pacientes',
        canActivate: [GuardAuthGuard],
        component: PacientesComponent
      },
      {
        path: 'personas',
        canActivate: [GuardAuthGuard],
        component: PersonaComponent
      }
      ,
      {
        path: 'personas-pacientes',
        canActivate: [GuardAuthGuard],
        component: PersonaPacienteComponent
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pacientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
