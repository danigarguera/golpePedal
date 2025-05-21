import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service'; 

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.scss']
})
export class TarjetaProductoComponent {
  @Input() producto!: {
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    imagenUrl?: string;
  };

  @Output() productoAñadido = new EventEmitter<void>(); // ✅ emisor del banner

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(event: MouseEvent): void {
    event.stopPropagation(); 
    this.carritoService.agregarProducto(this.producto);

    this.productoAñadido.emit(); // ✅ notificar al padre para mostrar banner
  }
}
