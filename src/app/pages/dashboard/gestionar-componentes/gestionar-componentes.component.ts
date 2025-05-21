import { Component, OnInit } from '@angular/core';
import { ComponentesService, ComponenteDTO } from '../../../services/componentes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-componentes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestionar-componentes.component.html'
})
export class GestionarComponentesComponent implements OnInit {
  componentes: ComponenteDTO[] = [];
  componentesFiltrados: ComponenteDTO[] = [];

  filtroTipo: string = '';
  filtroMarca: string = '';
  tiposDisponibles: string[] = [];
  marcasDisponibles: string[] = [];

  ordenCampo: keyof ComponenteDTO | '' = '';
  ordenAscendente: boolean = true;

  constructor(
    private componentesService: ComponentesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarComponentes();
  }

  cargarComponentes(): void {
    this.componentesService.obtenerComponentesDTO().subscribe({
      next: (data) => {
        this.componentes = data;
        this.actualizarFiltrosDisponibles(data);
        this.aplicarFiltros();
      },
      error: (err) => console.error('❌ Error al cargar componentes:', err)
    });
  }

  actualizarFiltrosDisponibles(data: ComponenteDTO[]): void {
    this.tiposDisponibles = Array.from(
      new Set<string>(
        data.map(c => c.tipo).filter((tipo): tipo is string => typeof tipo === 'string')
      )
    );

    this.marcasDisponibles = Array.from(
      new Set<string>(
        data.map(c => c.marca).filter((marca): marca is string => typeof marca === 'string')
      )
    );
  }

  aplicarFiltros(): void {
    this.componentesFiltrados = this.componentes.filter(c => {
      const coincideTipo = this.filtroTipo ? c.tipo === this.filtroTipo : true;
      const coincideMarca = this.filtroMarca ? c.marca === this.filtroMarca : true;
      return coincideTipo && coincideMarca;
    });
    if (this.ordenCampo) this.ordenarPor(this.ordenCampo, false); // mantener orden actual
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este componente?')) {
      this.componentesService.eliminar(id).subscribe({
        next: () => this.cargarComponentes(),
        error: (err) => console.error('❌ Error al eliminar componente:', err)
      });
    }
  }

  ordenarPor(campo: keyof ComponenteDTO, alternar: boolean = true): void {
    if (!campo) return;

    if (this.ordenCampo === campo && alternar) {
      this.ordenAscendente = !this.ordenAscendente;
    } else if (alternar) {
      this.ordenCampo = campo;
      this.ordenAscendente = true;
    }

    this.componentesFiltrados.sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];

      if (valorA == null) return 1;
      if (valorB == null) return -1;

      return this.ordenAscendente
        ? String(valorA).localeCompare(String(valorB))
        : String(valorB).localeCompare(String(valorA));
    });
  }
  getIconoOrden(campo: keyof ComponenteDTO): string {
    if (this.ordenCampo !== campo) return '';
    return this.ordenAscendente ? 'bi-caret-up-fill' : 'bi-caret-down-fill';
  }


  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.filtroMarca = '';
    this.aplicarFiltros();
  }
}
