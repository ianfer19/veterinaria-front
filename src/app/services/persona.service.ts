import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllPersona(){
    return this.http.get<any>(`${this.apiServerUrl}/persona`)
  }

  getPersona(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/persona/${id}`);
  }

  addPersona(persona: Persona){
    return this.http.post<Persona>(`${this.apiServerUrl}/persona`, persona)
  }

  updatePersona(persona: Persona){
    return this.http.put<Persona>(`${this.apiServerUrl}/persona`, persona)
  }
}
