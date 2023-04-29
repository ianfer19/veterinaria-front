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
    return this.http.get<any>(`${this.apiServerUrl}/paciente`)
  }

  getPaciente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/paciente/${id}`);
  }

  getPacienteExist(id: number): Observable<boolean>{
    return this.http.get<any>(`${this.apiServerUrl}/paciente-exist/${id}`);
  }

  addPaciente(paciente: Paciente){
    return this.http.post<Paciente>(`${this.apiServerUrl}/paciente`, paciente)
  }

  updatePaciente(paciente: Paciente){
    return this.http.put<Paciente>(`${this.apiServerUrl}/paciente`, paciente)
  }

  getPacientePersona(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/paciente-persona/${id}`);
  }

  exportAll(){
    return this.http.get<any>(`${this.apiServerUrl}/export/all`)
  }

}
