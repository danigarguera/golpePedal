import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  dni: string;
  email: string;
  telefono: string;
  rol: Rol;

}

export interface Rol {
  id: number;
  nombre: string;
}

export interface Direccion {
  id: number;
  alias: string;
  calle: string;
  numero: string;
  piso?: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
}

export interface PedidoComponenteDTO {
  componenteId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}


export interface Pedido {
  id: number;
  fecha: string;
  estado: 'PENDIENTE' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO';
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener datos del usuario logueado
  getDatosUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/me`);
  }

  // Obtener todas las direcciones del usuario
  getDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}/direcciones`);
  }

  crearDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(`${this.apiUrl}/direcciones`, direccion);
  }

  editarDireccion(id: number, direccion: Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(`${this.apiUrl}/direcciones/${id}`, direccion);
  }

  eliminarDireccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/direcciones/${id}`);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
  }

  getComponentesDePedido(pedidoId: number): Observable<PedidoComponenteDTO[]> {
    return this.http.get<PedidoComponenteDTO[]>(`${this.apiUrl}/pedido-componentes/pedido/${pedidoId}`);
  }

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  cambiarRol(usuarioId: number, nuevoRol: string): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/usuarios/${usuarioId}/rol`, { rol: nuevoRol });
}


}
