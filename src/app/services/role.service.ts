import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  getRol(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol || '';
    } catch (e) {
      console.error('❌ Error leyendo el rol desde el token:', e);
      return '';
    }
  }

  getEmail(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || '';
    } catch (e) {
      console.error('❌ Error leyendo el email desde el token:', e);
      return '';
    }
  }

  isAdmin(): boolean {
    return this.getRol() === 'ROLE_ADMIN';
  }

  isCliente(): boolean {
    return this.getRol() === 'ROLE_CLIENTE';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token') && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now > exp;
    } catch (e) {
      console.error('❌ Error comprobando expiración del token:', e);
      return true;
    }
  }
}
