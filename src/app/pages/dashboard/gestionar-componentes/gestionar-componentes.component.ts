import { Component, OnInit } from '@angular/core';
import { ComponentesService, ComponenteDTO } from '../../../services/componentes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-componentes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gestionar-componentes.component.html'
})
export class GestionarComponentesComponent implements OnInit {
  componentes: ComponenteDTO[] = [];

  constructor(
    private componentesService: ComponentesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarComponentes();
  }

  cargarComponentes(): void {
    this.componentesService.obtenerComponentesDTO().subscribe({
      next: (data) => this.componentes = data,
      error: (err) => console.error('❌ Error al cargar componentes:', err)
    });

  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este componente?')) {
      this.componentesService.eliminar(id).subscribe({
        next: () => {
          this.cargarComponentes(); // Recargar la lista
        },
        error: (err) => console.error('❌ Error al eliminar componente:', err)
      });
    }
  }
}
