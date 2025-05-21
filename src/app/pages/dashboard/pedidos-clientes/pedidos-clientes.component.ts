import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pedidos-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos-clientes.component.html'
})
export class PedidosClientesComponent implements OnInit {
  pedidos: any[] = [];
  desde: string = '';
  hasta: string = '';
  estadoFiltro: string = '';
  cargando = false;

  campoOrden: string = '';
  direccionOrden: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    let params = new HttpParams();
    if (this.desde) params = params.set('desde', this.desde);
    if (this.hasta) params = params.set('hasta', this.hasta);
    if (this.estadoFiltro) params = params.set('estado', this.estadoFiltro);

    this.http.get<any[]>(`${environment.apiUrl}/pedidos/por-clientes`, { params }).subscribe({
      next: data => {
        this.pedidos = data;
        this.ordenarPor(this.campoOrden); // reordena si ya había un campo
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar pedidos:', err);
        this.cargando = false;
      }
    });
  }

  actualizarEstado(pedido: any): void {
    this.http.put(`${environment.apiUrl}/pedidos/${pedido.id}/estado`, JSON.stringify(pedido.estado), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: () => {
        // aquí puedes usar un banner, toast, etc.
        console.log('✅ Estado actualizado correctamente');
      },
      error: err => {
        console.error('Error al actualizar estado:', err);
      }
    });
  }

  ordenarPor(campo: string): void {
    if (this.campoOrden === campo) {
      this.direccionOrden = this.direccionOrden === 'asc' ? 'desc' : 'asc';
    } else {
      this.campoOrden = campo;
      this.direccionOrden = 'asc';
    }

    this.pedidos.sort((a, b) => {
      const valA = a[campo]?.toString().toLowerCase?.() ?? '';
      const valB = b[campo]?.toString().toLowerCase?.() ?? '';

      if (valA < valB) return this.direccionOrden === 'asc' ? -1 : 1;
      if (valA > valB) return this.direccionOrden === 'asc' ? 1 : -1;
      return 0;
    });
  }

  irADetalle(id: number): void {
    this.router.navigate(['/dashboard/detalle-venta', id]);
  }
}
