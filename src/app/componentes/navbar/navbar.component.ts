import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { CarritoService } from '../../services/carrito.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  carritoCantidad = 0;
  logoUrl = '';

  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  constructor(
    private router: Router,
    public roleService: RoleService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.carritoCantidad = this.carritoService.obtenerCarrito().reduce((suma, p) => suma + p.cantidad, 0);

    this.carritoService.contador$.subscribe(cantidad => {
      this.carritoCantidad = cantidad;
    });

    this.setLogoByRol();
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

  setLogoByRol(): void {
    const rol = this.roleService.getRol();
    this.logoUrl = rol === 'ROLE_ADMIN' || rol === 'ROLE_EMPLEADO'
      ? 'assets/logos/logoVectorizado.svg'
      : 'assets/img/logo-azul.svg';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.carritoService.vaciarCarrito();
    this.router.navigate(['/login']);
  }

  cerrarMenu(): void {
    if (this.navbarCollapse?.nativeElement?.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(this.navbarCollapse.nativeElement, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }
}
