import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DireccionDTO {
  id?: number;
  alias: string;
  calle: string;
  numero: string;
  piso?: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
}

export interface DireccionCreateEmpleadoDTO {
  alias: string;
  calle: string;
  numero: string;
  piso?: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  obtenerMisDirecciones(): Observable<DireccionDTO[]> {
    return this.http.get<DireccionDTO[]>(`${this.apiUrl}/direcciones`);
  }


  crearDireccion(direccion: DireccionDTO): Observable<DireccionDTO> {
    return this.http.post<DireccionDTO>(`${this.apiUrl}/direcciones`, direccion);
  }


  obtenerDireccionesPorUsuario(usuarioId: number): Observable<DireccionDTO[]> {
    return this.http.get<DireccionDTO[]>(`${this.apiUrl}/direcciones/usuario/${usuarioId}`);
  }

  crearDireccionComoEmpleado(direccion: DireccionCreateEmpleadoDTO): Observable<DireccionDTO> {
    return this.http.post<DireccionDTO>(`${this.apiUrl}/direcciones/admin`, direccion);
  }



}
