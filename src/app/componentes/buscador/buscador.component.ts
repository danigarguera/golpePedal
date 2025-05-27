import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentesService } from '../../services/componentes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ) { }

  ngOnInit(): void {
    this.componentesService.obtenerComponentes().subscribe(componentes => {
      this.tiposSugeridos = [...new Set(componentes.map(c => c.tipo).filter(Boolean))].sort();
    });
  }

  onBuscar(): void {
    const tipo = this.tipoInput.trim();
    if (tipo) {
      this.router.navigate(['/componentes'], {
        queryParams: { tipo }
      });
    }
  }
}
