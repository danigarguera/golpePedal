import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Componente {
  id: number;
  nombre: string;
  tipo: string;
  marca: string;
  descripcion: string;
  precio: number;
}
   
@Injectable({
  providedIn: 'root'
})
export class ComponentesService {

  private apiUrl = 'http://localhost:8080/api/componentes';

  constructor(private http: HttpClient) {}

  obtenerComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Componente> {
    return this.http.get<Componente>(`${this.apiUrl}/${id}`);
  }

  filtrarPorMarca(marca: string): Observable<Componente[]> {
    return this.http.get<Componente[]>(`${this.apiUrl}?marca=${marca}`);
  }
  
}
