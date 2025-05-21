import { Component, OnInit } from '@angular/core';
import { PedidoService, PedidoResumenDTO } from '../../../services/pedido.service';
import { RouterModule } from '@angular/router'; 
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule], 
  templateUrl: './mis-pedidos.component.html'
})

export class MisPedidosComponent implements OnInit {
  pedidos: PedidoResumenDTO[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.getPedidosDelUsuario().subscribe({
      next: (res) => {
        this.pedidos = res;
        console.log('✅ Pedidos del usuario:', res);
      },
      error: (err) => {
        console.error('❌ Error al obtener pedidos', err);
      }
    });
  }

  sortCampo: string = '';
sortAsc: boolean = true;

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
  return this.sortAsc ? 'bi bi-arrow-down' : 'bi bi-arrow-up';
}

}
