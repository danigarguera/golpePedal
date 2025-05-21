import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  carritoCantidad = 0;

  constructor(
    private router: Router,
    public roleService: RoleService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    // Carga inicial del contador al iniciar app
    this.carritoCantidad = this.carritoService.obtenerCarrito().reduce((suma, p) => suma + p.cantidad, 0);

    // Suscripción para actualizar el contador en tiempo real
    this.carritoService.contador$.subscribe(cantidad => {
      this.carritoCantidad = cantidad;
    });
  }

  isLoggedIn(): boolean {
    return this.roleService.isAuthenticated();
  }

  getEmail(): string {
    return this.roleService.getEmail();
  }

  mostrarDashboard(): boolean {
    const rol = this.roleService.getRol();
    return rol === 'ROLE_ADMIN' || rol === 'ROLE_EMPLEADO';
  }

  getNavbarClass(): string {
    const rol = this.roleService.getRol();
    return rol === 'ROLE_ADMIN' || rol === 'ROLE_EMPLEADO'
      ? 'navbar-admin'
      : 'navbar-cliente';
  }


  logout(): void {
    localStorage.removeItem('token');
    this.carritoService.vaciarCarrito(); // 🧹 Vacía el carrito al cerrar sesión
    this.router.navigate(['/login']);
  }
}
