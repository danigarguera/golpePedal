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

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    let params = new HttpParams();
    if (this.desde) params = params.set('desde', this.desde);
    if (this.hasta) params = params.set('hasta', this.hasta);
    if (this.estadoFiltro) params = params.set('estado', this.estadoFiltro);
    console.log('🔍 Filtro estado enviado:', this.estadoFiltro);

    this.http.get<any[]>(`${environment.apiUrl}/pedidos/por-clientes`, { params }).subscribe({
      next: data => {
        this.pedidos = data;
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
      next: () => alert('Estado actualizado correctamente'),
      error: err => {
        console.error('Error al actualizar estado:', err);
        alert('No se pudo actualizar el estado');
      }
    });
  }


  ordenarPor(campo: string): void {
    if (this.sortField === campo) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = campo;
      this.sortDirection = 'asc';
    }

    this.pedidos.sort((a, b) => {
      const valA = a[campo];
      const valB = b[campo];

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  irADetalle(id: number): void {
    this.router.navigate(['/dashboard/detalle-venta', id]);
  }
}
