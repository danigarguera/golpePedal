import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ProtectedComponent } from '../../shared/protected.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends ProtectedComponent {
  constructor(router: Router, roleService: RoleService) {
    super();
  }

  override onInitAfterAuth(): void {
    console.log('📊 Dashboard cargado para:', this.email, 'con rol:', this.rol);
    // Aquí puedes hacer lógica adicional si quieres
  }
}
