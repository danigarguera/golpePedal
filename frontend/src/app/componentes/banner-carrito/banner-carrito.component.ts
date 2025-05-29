import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-banner-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-carrito.component.html',
  styleUrls: ['./banner-carrito.component.scss']
})
export class BannerCarritoComponent {
  private roleService = inject(RoleService);

  @Input() mostrar = false;

  getClasePorRol(): string {
    const rol = this.roleService.getRol(); 
    return rol === 'ROLE_ADMIN' || rol === 'ROLE_EMPLEADO'
      ? 'banner-admin'
      : 'banner-cliente';
  }
}
