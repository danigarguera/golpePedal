import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentesService } from '../../services/componentes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscador',
  standalone: true,
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class BuscadorComponent implements OnInit {
  tipoInput: string = '';
  tiposSugeridos: string[] = [];

  constructor(
    private router: Router,
    private componentesService: ComponentesService
  ) {}

  ngOnInit(): void {
    this.componentesService.obtenerComponentes().subscribe(componentes => {
      this.tiposSugeridos = [...new Set(componentes.map(c => c.tipo?.toLowerCase()).filter(Boolean))].sort();
    });
  }

  onBuscar(): void {
    const tipo = this.tipoInput.trim().toLowerCase();
    if (!tipo) return;

    const existe = this.tiposSugeridos.includes(tipo);

    if (existe) {
      this.router.navigate(['/componentes'], {
        queryParams: { tipo }
      });
      this.tipoInput = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Componente no encontrado',
        text: `No existe el componente "${this.tipoInput}"`,
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onSeleccionarSugerencia(): void {
    this.onBuscar();
  }
}
