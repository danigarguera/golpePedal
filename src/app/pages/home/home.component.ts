import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categorias: string[] = [
    'Cambios',
    'Suspensiones',
    'Ruedas',
    'Transmisión',
    'Frenos'
  ];

  constructor(private router: Router) {}

  verCategoria(categoria: string) {
    this.router.navigate(['/componentes'], {
      queryParams: { tipo: categoria }
    });
  }
}
