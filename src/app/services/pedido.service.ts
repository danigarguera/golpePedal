import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// DTOs

export interface LineaPedidoDTO {
  componenteId: number;
  cantidad: number;
  precioUnitario: number;
}

export interface PedidoResumenDTO {
  id: number;
  numeroPedido: string;
  fecha: string;
  estado: string;
  total: number;
  direccionAlias: string;
}

export interface VentaEmpleadoDTO {
  id: number;
  numeroPedido: string;
  fecha: string; // o Date si lo parseas
  cliente: string;
  empleado: string;
  total: number;
}

export interface PedidoRequestDTO {
  usuarioId: number;
  direccionId: number | null; // ✅ Así acepta que no se haya seleccionado dirección
  lineas: LineaPedidoDTO[];
}


export interface PedidoResponseDTO {
  id: number;
  numeroPedido: string;
  usuarioId: number;
  fecha: string;
  estado: string;
  total: number;
  usuario: {
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    telefono: string;
  };

  direccion: {
    alias: string;
    calle: string;
    numero: string;
    piso?: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
    pais: string;
  };
  lineas: {
    componenteId: number;
    nombre: string;
    precioUnitario: number;
    cantidad: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  crearPedido(pedido: PedidoRequestDTO): Observable<PedidoResponseDTO> {
    return this.http.post<PedidoResponseDTO>(this.apiUrl, pedido);
  }

  getPedidosDelUsuario(): Observable<PedidoResumenDTO[]> {
    return this.http.get<PedidoResumenDTO[]>(`${this.apiUrl}/mios`);
  }

  getPedidoPorId(id: number): Observable<PedidoResponseDTO> {
    return this.http.get<PedidoResponseDTO>(`${this.apiUrl}/${id}`);
  }
  crearPedidoComoEmpleado(pedido: PedidoRequestDTO): Observable<PedidoResponseDTO> {
    return this.http.post<PedidoResponseDTO>(`${this.apiUrl}/crear-empleado`, pedido);
  }
  getVentasPorEmpleados(desde?: string, hasta?: string): Observable<VentaEmpleadoDTO[]> {
    let params = new HttpParams();
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    return this.http.get<VentaEmpleadoDTO[]>(`${this.apiUrl}/pedidos/por-empleados`, { params });
  }


}
