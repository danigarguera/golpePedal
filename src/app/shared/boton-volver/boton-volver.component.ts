import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boton-volver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-volver.component.html'
})
export class BotonVolverComponent {
  constructor(private router: Router) {}

  irADashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
