import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentesService, Componente } from '../../../../src/app/services/componentes.service';
import { NgFor } from '@angular/common';
import { environment } from '../../../../src/environments/environment';
import { CarritoService } from '../../../../src/app/services/carrito.service';
import { BannerService } from '../../services/banner.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bicicletas: Componente[] = [];
  destacados: Componente[] = [];
  apiUrl = environment.apiUrl;
  imagenFallida: { [id: number]: boolean } = {};

  constructor(
    private router: Router,
    private componentesService: ComponentesService,
    private carritoService: CarritoService,
    private bannerService: BannerService


  ) { }

  ngOnInit(): void {
    this.componentesService.obtenerComponentes().subscribe(componentes => {
      const bicicletas = componentes.filter(c => c.tipo?.toLowerCase() === 'bicicleta');
      this.bicicletas = bicicletas;

      this.destacados = this.seleccionarAleatorios(componentes, 6);
    });
  }

  seleccionarAleatorios(lista: Componente[], cantidad: number): Componente[] {
    const copia = [...lista];
    const seleccionados: Componente[] = [];
    while (seleccionados.length < cantidad && copia.length > 0) {
      const index = Math.floor(Math.random() * copia.length);
      seleccionados.push(copia.splice(index, 1)[0]);
    }
    return seleccionados;
  }

  verDetalle(id: number) {
    this.router.navigate(['/componentes', id]);
  }

  marcarImagenComoFallida(id: number): void {
    this.imagenFallida[id] = true;
  }

  agregarAlCarrito(componente: Componente): void {
    this.carritoService.agregarProducto(componente);
    this.bannerService.mostrarBannerTemporal(); 
  }


}
