import { Component, OnInit } from '@angular/core';
import { PedidoService, PedidoResumenDTO } from '../../../services/pedido.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], 
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
}
