import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService, PedidoResponseDTO } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';

declare let window: any; // Soporte para window.print()

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pedido.component.html'
})
export class DetallePedidoComponent implements OnInit {
  pedido: PedidoResponseDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const navState = this.router.getCurrentNavigation()?.extras?.state;

    if (navState?.['pedido']) {
      this.pedido = navState['pedido'];
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pedidoService.getPedidoPorId(+id).subscribe({
          next: (res) => (this.pedido = res),
          error: () => {
            alert('No se pudo cargar el pedido');
            this.router.navigate(['/area-personal/pedidos']);
          }
        });
      } else {
        alert('Pedido no válido');
        this.router.navigate(['/']);
      }
    }
  }

  imprimir(): void {
    window.print();
  }
}
