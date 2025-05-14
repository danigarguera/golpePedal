import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private roleService: RoleService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!this.roleService.isAuthenticated()) {
      return this.router.parseUrl('/login');
    }

    const rolUsuario = this.roleService.getRol();
    const rolesPermitidos: string[] = route.data['roles'];

    if (rolesPermitidos.includes(rolUsuario)) {
      return true;
    }

    return this.router.parseUrl('/');
  }
}
