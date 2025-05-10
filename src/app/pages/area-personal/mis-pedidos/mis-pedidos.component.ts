import { Component, OnInit } from '@angular/core';
import { UsuarioService, Pedido, PedidoComponenteDTO } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { BotonVolverComponent } from '../../../shared/boton-volver/boton-volver.component';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, BotonVolverComponent],
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSeleccionadoId: number | null = null;
  componentesDelPedido: PedidoComponenteDTO[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getPedidos().subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error('❌ Error al obtener pedidos', err)
    });
  }

  verDetalles(pedidoId: number): void {
    if (this.pedidoSeleccionadoId === pedidoId) {
      // Si ya está abierto, lo cerramos
      this.pedidoSeleccionadoId = null;
      this.componentesDelPedido = [];
    } else {
      this.pedidoSeleccionadoId = pedidoId;
      this.usuarioService.getComponentesDePedido(pedidoId).subscribe({
        next: (data) => this.componentesDelPedido = data,
        error: (err) => console.error('❌ Error al obtener componentes del pedido', err)
      });
    }
  }
}
