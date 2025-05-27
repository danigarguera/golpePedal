import { Component, OnInit } from '@angular/core';
import { ComponentesService, ComponenteDTO } from '../../../services/componentes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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

  page: number = 1;
  pageSize: number = 10;

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

    this.page = 1;
    if (this.ordenCampo) this.ordenarPor(this.ordenCampo, false);
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el componente permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.componentesService.eliminar(id).subscribe({
          next: () => {
            this.cargarComponentes();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El componente fue eliminado correctamente',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('❌ Error al eliminar componente:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el componente'
            });
          }
        });
      }
    });
  }

  ordenarPor(campo: keyof ComponenteDTO, alternar: boolean = true): void {
    if (!campo) return;

    if (this.ordenCampo === campo && alternar) {
      this.ordenAscendente = !this.ordenAscendente;
    } else if (alternar || this.ordenCampo !== campo) {
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

  get componentesPaginados(): ComponenteDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.componentesFiltrados.slice(start, start + this.pageSize);
  }

  get totalPaginas(): number {
    return Math.ceil(this.componentesFiltrados.length / this.pageSize);
  }
}
