import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BotonVolverComponent } from '../../shared/boton-volver/boton-volver.component';
import { ComponentesService, Componente } from '../../services/componentes.service';

@Component({
  selector: 'app-detalle-componente',
  standalone: true,
  imports: [CommonModule, RouterModule, BotonVolverComponent],
  templateUrl: './detalle-componente.component.html',
  styleUrls: ['./detalle-componente.component.css']
})
export class DetalleComponenteComponent implements OnInit {
  componente: Componente | null = null;
  error = '';
  componentesService = inject(ComponentesService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.componentesService.obtenerPorId(+id).subscribe({
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
}
