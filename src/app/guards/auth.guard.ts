import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log('🛡️ Comprobando token en AuthGuard:', token);
  
    if (token) {
      console.log('✅ Token encontrado. Acceso permitido.');
      return true;
    } else {
      console.log('❌ Token no encontrado. Redirigiendo a login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
