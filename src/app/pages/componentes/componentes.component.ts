import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { BotonVolverComponent } from '../../shared/boton-volver/boton-volver.component';
import { ComponentesService, Componente } from '../../services/componentes.service';
import { ProtectedComponent } from '../../shared/protected.component';
import { TarjetaProductoComponent } from '../../componentes/tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BotonVolverComponent,
    TarjetaProductoComponent
  ],
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent extends ProtectedComponent {
  componentesService = inject(ComponentesService);
  route = inject(ActivatedRoute);

  constructor() {
    super();
  }

  componentes: Componente[] = [];
  componentesOriginales: Componente[] = [];
  error: string = '';

  filtroTipo: string = '';
  filtroMarca: string = '';
  tiposDisponibles: string[] = [];
  marcasDisponibles: string[] = [];

  override onInitAfterAuth(): void {
    // Leer parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.filtroTipo = params['tipo'] || '';
      this.filtroMarca = params['marca'] || '';
    });

    this.componentesService.obtenerComponentes().subscribe({
      next: (data) => {
        this.componentesOriginales = data;

        this.tiposDisponibles = [...new Set(data.map(c => c.tipo))];
        this.marcasDisponibles = [...new Set(data.map(c => c.marca))];

        this.aplicarFiltros(); // aplicar filtros si había en la URL
        console.log('✅ Componentes recibidos:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar componentes:', err);
        this.error = 'No se pudieron cargar los componentes.';
      }
    });
  }

  aplicarFiltros(): void {
    this.componentes = this.componentesOriginales.filter(componente => {
      const coincideTipo = this.filtroTipo ? componente.tipo === this.filtroTipo : true;
      const coincideMarca = this.filtroMarca ? componente.marca === this.filtroMarca : true;
      return coincideTipo && coincideMarca;
    });
  }
}
