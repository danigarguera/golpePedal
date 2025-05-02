import { Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';

@Injectable()
export abstract class ProtectedComponent implements OnInit {
  rol: string = '';
  email: string = '';

  protected router = inject(Router);
  protected roleService = inject(RoleService);

  ngOnInit(): void {
    if (!this.roleService.isAuthenticated() || this.roleService.isTokenExpired()) {
      console.warn('🔐 Sesión inválida o expirada. Redirigiendo al login...');
      this.logout();
      return;
    }

    this.rol = this.roleService.getRol();
    this.email = this.roleService.getEmail();
    this.onInitAfterAuth();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  abstract onInitAfterAuth(): void;
}
