import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ventas-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas-empleados.component.html',
  styleUrl: './ventas-empleados.component.scss'
})
export class VentasEmpleadosComponent implements OnInit {
  ventas: any[] = [];
  empleados: any[] = [];
  empleadoSeleccionado: string = '';

  desde: string = '';
  hasta: string = '';
  cargando = false;

  paginaActual: number = 1;
  ventasPorPagina: number = 10;

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarVentas();
  }

  cargarEmpleados(): void {
    this.http.get<any[]>(`${environment.apiUrl}/usuarios/empleados`).subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
      }
    });
  }

  get ventasPaginadas(): any[] {
    const inicio = (this.paginaActual - 1) * this.ventasPorPagina;
    return this.ventas.slice(inicio, inicio + this.ventasPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.ventas.length / this.ventasPorPagina);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }
  cargarVentas(): void {
    this.cargando = true;

    let params = new HttpParams();
    if (this.desde) params = params.set('desde', this.desde);
    if (this.hasta) params = params.set('hasta', this.hasta);
    if (this.empleadoSeleccionado) params = params.set('empleadoId', this.empleadoSeleccionado);

    this.http.get<any[]>(`${environment.apiUrl}/pedidos/por-empleados`, { params }).subscribe({
      next: (data) => {
        this.ventas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
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

    this.ventas.sort((a, b) => {
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

  exportarCSV(): void {
    const encabezado = 'Fecha,Cliente,Empleado,Total\n';
    const filas = this.ventas.map(v =>
      `${v.fecha},${v.cliente},${v.empleado},${v.total}`
    ).join('\n');

    const csv = encabezado + filas;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ventas-empleados.csv';
    link.click();
  }
}
