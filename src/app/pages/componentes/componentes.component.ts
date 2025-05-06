import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { BotonVolverComponent } from '../../shared/boton-volver/boton-volver.component';
import { ComponentesService, Componente } from '../../services/componentes.service';
import { ProtectedComponent } from '../../shared/protected.component';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [CommonModule, RouterModule, BotonVolverComponent], // ✅ AÑADIR RouterModule AQUÍ
  templateUrl: './componentes.component.html'
})
export class ComponentesComponent extends ProtectedComponent {
  componentesService = inject(ComponentesService);

  constructor() {
    super();
  }

  componentes: Componente[] = [];
  error: string = '';

  override onInitAfterAuth(): void {
    this.componentesService.obtenerComponentes().subscribe({
      next: (data) => {
        this.componentes = data;
        console.log('✅ Componentes recibidos:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar componentes:', err);
        this.error = 'No se pudieron cargar los componentes.';
      }
    });
  }
}
