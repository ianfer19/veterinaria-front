import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Paciente } from 'src/app/interfaces/Paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {

  constructor (private pacienteService: PacienteService){}

  dataPaciente:any;

  ngOnInit(){
    this.send();
  }

  send():any{
    this.pacienteService.getAllPaciente()
    .subscribe(data => this.dataPaciente = data);
}
}
