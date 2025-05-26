import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentesService, Componente } from '../../services/componentes.service';
import { environment } from '../../../environments/environment';
import { CarritoService } from '../../services/carrito.service';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-detalle-componente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-componente.component.html',
  styleUrls: ['./detalle-componente.component.scss']
})
export class DetalleComponenteComponent implements OnInit {
  componente: Componente | null = null;
  error = '';
  apiUrl = environment.apiUrl;
  imagenError = false;
  bannerVisible = false;

  componentesService = inject(ComponentesService);
  route = inject(ActivatedRoute);
  carritoService = inject(CarritoService);
  bannerService = inject(BannerService);

  @Output() productoAñadido = new EventEmitter<void>();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.componentesService.obtenerEntidadPorId(+id).subscribe({
        next: (data) => this.componente = data,
        error: (err) => {
          console.error('❌ Error al cargar componente:', err);
          this.error = 'No se pudo cargar el componente.';
        }
      });
    } else {
      this.error = 'ID inválido';
    }
  }

  marcarImagenComoFallida(): void {
    this.imagenError = true;
  }

  agregarAlCarrito(): void {
    if (!this.componente) return;

    this.carritoService.agregarProducto({
      id: this.componente.id,
      nombre: this.componente.nombre,
      precio: this.componente.precio,
      imagenUrl: `${this.apiUrl}/componentes/${this.componente.id}/imagen`
    });

    this.bannerService.mostrarBannerTemporal(); // ✅ Banner reactivo
  }
}
