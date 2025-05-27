import { Component, OnInit } from '@angular/core';
import { PedidoService, PedidoResumenDTO } from '../../../services/pedido.service';
import { RouterModule } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './mis-pedidos.component.html'
})
export class MisPedidosComponent implements OnInit {
  pedidos: PedidoResumenDTO[] = [];
  sortCampo: string = '';
  sortAsc: boolean = true;

  page: number = 1;
  pageSize: number = 10;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getPedidosDelUsuario().subscribe({
      next: (res) => {
        this.pedidos = res;
        this.ordenarPor('id'); // orden inicial opcional
      },
      error: (err) => {
        console.error('Error al obtener pedidos', err);
      }
    });
  }

  ordenarPor(campo: string): void {
    if (this.sortCampo === campo) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortCampo = campo;
      this.sortAsc = true;
    }

    this.pedidos.sort((a: any, b: any) => {
      const valorA = a[campo];
      const valorB = b[campo];

      if (valorA < valorB) return this.sortAsc ? -1 : 1;
      if (valorA > valorB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  getIconoOrden(campo: string): string {
    if (this.sortCampo !== campo) return 'bi bi-arrow-down-up';
    return this.sortAsc ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
  }

  get pedidosPaginados(): PedidoResumenDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.pedidos.slice(start, start + this.pageSize);
  }

  get totalPaginas(): number {
    return Math.ceil(this.pedidos.length / this.pageSize);
  }
}
