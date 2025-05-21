import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService, PedidoResponseDTO } from '../../../services/pedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-venta.component.html'
})
export class DetalleVentaComponent implements OnInit {
  pedido: PedidoResponseDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
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
          next: (res) => this.pedido = res,
          error: () => {
            alert('No se pudo cargar la venta');
            this.router.navigate(['/dashboard']);
          }
        });
      } else {
        alert('ID de venta no válido');
        this.router.navigate(['/dashboard']);
      }
    }
  }
    imprimir(): void {
    window.print();
  }
}
