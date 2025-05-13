import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService, ProductoCarrito } from '../../services/carrito.service';
import { PedidoService, PedidoRequestDTO } from '../../services/pedido.service';
import { DireccionDTO } from '../../services/direccion.service';
import { AuthService, UsuarioAuthDTO } from '../../services/auth.service';

@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finalizar-compra.component.html'
})
export class FinalizarCompraComponent implements OnInit {
  carrito: ProductoCarrito[] = [];
  direccion!: DireccionDTO;
  usuarioId: number = 0;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUsuarioActual().subscribe({
     next: (usuario: UsuarioAuthDTO) => {
        this.usuarioId = usuario.id;

        this.direccion = history.state['direccionSeleccionada'] ?? null;
        if (!this.direccion) {
          alert('No se ha seleccionado una dirección');
          this.router.navigate(['/seleccionar-direccion']);
          return;
        }

        this.carrito = this.carritoService.obtenerCarrito();

        if (this.carrito.length === 0) {
          alert('Tu carrito está vacío');
          this.router.navigate(['/carrito']);
          return;
        }
    },
    error: () => {
      alert('Debes iniciar sesión');
      this.router.navigate(['/login']);
    }
  });
}


  get totalPedido(): number {
    return this.carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }

finalizarCompra(): void {
  const pedido: PedidoRequestDTO = {
    usuarioId: this.usuarioId,
    direccionId: this.direccion.id!,
    lineas: this.carrito.map(p => ({
      componenteId: p.id,
      cantidad: p.cantidad,
      precioUnitario: p.precio
    }))
  };

  console.log('📦 Enviando pedido:', pedido);

  this.pedidoService.crearPedido(pedido).subscribe({
    next: (pedidoCreado) => {
      console.log('✅ Pedido creado correctamente:', pedidoCreado);
      this.carritoService.vaciarCarrito();
      this.router.navigate(['/pedido', pedidoCreado.id], { state: { pedido: pedidoCreado } });
    },
    error: err => {
      console.error('❌ Error al crear pedido:', err);
      alert('Hubo un error al finalizar el pedido.');
    }
  });
}

}
