import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/interfaces/Paciente';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss']
})
export class BarraComponent {
  constructor (private authService: AuthService, private router: Router, private pacienteService: PacienteService){}

  [x: string]: any;
  dataPaciente: Array<Paciente>= [];
  token = localStorage.getItem('token');
  searchTerm!: string;
  resultados: any[] | undefined;

  ngOnInit(){
    let arrayPacientes: Array<Paciente> = [];
    this.pacienteService.getAllPaciente()
    .subscribe(data => {this.dataPaciente = data.data;
      });
  }

  logOut(){
  this.authService.logOut(this.token)
  .subscribe(response =>{
    this.router.navigate(['/login']);
  });
  localStorage.removeItem('token');
}

buscar() {
  this.resultados = this.dataPaciente.filter((item) => {
    return item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
  });
}

}
