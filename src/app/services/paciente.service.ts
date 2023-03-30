import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../interfaces/Paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllPaciente(){
    return this.http.get<Paciente>(`${this.apiServerUrl}/paciente`)
  }

  addPaciente(paciente: Paciente){
    return this.http.post<Paciente>(`${this.apiServerUrl}/paciente`, paciente)
  }

  updatePaciente(paciente: Paciente){
    return this.http.put<Paciente>(`${this.apiServerUrl}/paciente`, paciente)
  }

}
