import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentesService, Componente } from '../../services/componentes.service';
import { TarjetaProductoComponent } from '../../componentes/tarjeta-producto/tarjeta-producto.component';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TarjetaProductoComponent
  ],
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss']
})
export class ComponentesComponent implements OnInit {
  componentesService = inject(ComponentesService);
  route = inject(ActivatedRoute);
  bannerService = inject(BannerService);

  componentes: Componente[] = [];
  componentesOriginales: Componente[] = [];
  error: string = '';

  filtroTipo: string = '';
  filtroMarca: string = '';
  tiposDisponibles: string[] = [];
  marcasDisponibles: string[] = [];

  page: number = 1;
  pageSize: number = 10;

  ngOnInit(): void {
    this.componentesService.obtenerComponentes().subscribe({
      next: (data) => {
        this.componentesOriginales = data;

        this.tiposDisponibles = [...new Set(data.map(c => c.tipo?.toLowerCase()).filter(Boolean))];
        this.marcasDisponibles = [...new Set(data.map(c => c.marca).filter(Boolean))];

        this.route.queryParams.subscribe(params => {
          this.filtroTipo = params['tipo'] || '';
          this.filtroMarca = params['marca'] || '';
          this.aplicarFiltros(); 
        });
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los componentes.';
      }
    });
  }


  aplicarFiltros(): void {
    this.componentes = this.componentesOriginales.filter(componente => {
      const coincideTipo = this.filtroTipo
        ? componente.tipo?.toLowerCase() === this.filtroTipo.toLowerCase()
        : true;

      const coincideMarca = this.filtroMarca
        ? componente.marca?.toLowerCase() === this.filtroMarca.toLowerCase()
        : true;

      return coincideTipo && coincideMarca;
    });

    this.page = 1;
  }


  mostrarBannerDesdeTarjeta(): void {
    this.bannerService.mostrarBannerTemporal();
  }

  get totalPaginas(): number {
    return Math.ceil(this.componentes.length / this.pageSize);
  }

  get componentesPaginados(): Componente[] {
    const start = (this.page - 1) * this.pageSize;
    return this.componentes.slice(start, start + this.pageSize);
  }
}
