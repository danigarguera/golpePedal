import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesService, Componente } from '../../services/componentes.service';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ProtectedComponent } from '../../shared/protected.component';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componentes.component.html'
})
export class ComponentesComponent extends ProtectedComponent {
  componentesService = inject(ComponentesService); // ✅
  constructor() {
    super(); // ✅ usando inject() ya en la clase base
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
