import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ✅ ruta relativa

export interface Componente {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo: string;
  marca: string;
  tipoBicicleta: string;
  imagenUrl?: string;
}



export interface ComponenteDTO {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo?: string;
  tipoBicicleta?: string;
  marca?: string;
  tipoComponenteId: number;
  marcaId: number;
  tipoBicicletaId: number;
}



export interface MarcaDTO {
  id: number;
  nombre: string;
}


@Injectable({
  providedIn: 'root'
})
export class ComponentesService {

  private apiUrl = `${environment.apiUrl}/componentes`; // ✅ URL del entorno

  constructor(private http: HttpClient) { }

  obtenerComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.apiUrl);
  }

  obtenerEntidadPorId(id: number): Observable<Componente> {
    return this.http.get<Componente>(`${this.apiUrl}/${id}`);
  }


  obtenerPorId(id: number): Observable<ComponenteDTO> {
    return this.http.get<ComponenteDTO>(`${this.apiUrl}/${id}`);
  }


  filtrarPorMarca(marca: string): Observable<Componente[]> {
    return this.http.get<Componente[]>(`${this.apiUrl}?marca=${marca}`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerMarcas(): Observable<MarcaDTO[]> {
    return this.http.get<MarcaDTO[]>(`${this.apiUrl}/marcas`);
  }

  obtenerTiposComponente(): Observable<{ id: number, nombre: string }[]> {
    return this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-componente`);
  }

  obtenerTiposBicicleta(): Observable<{ id: number, nombre: string }[]> {
    return this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-bicicleta`);
  }

  crearComponente(componente: ComponenteDTO): Observable<ComponenteDTO> {
    return this.http.post<ComponenteDTO>(this.apiUrl, componente);
  }

  actualizarComponente(id: number, componente: ComponenteDTO): Observable<ComponenteDTO> {
    return this.http.put<ComponenteDTO>(`${this.apiUrl}/${id}`, componente);
  }



  obtenerComponentesDTO(): Observable<ComponenteDTO[]> {
    return this.http.get<ComponenteDTO[]>(`${this.apiUrl}`);
  }

}
