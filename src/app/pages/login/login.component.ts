import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CarritoService } from '../../services/carrito.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private carritoService: CarritoService
  ) { }

  login() {
    this.error = '';
    this.mensaje = '';

    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('✅ Token guardado en localStorage:', res.token);

        this.carritoService.refrescarContador?.();

        // Decodificar el token para obtener el rol
        try {
          const decodedToken: any = jwtDecode(res.token);
          const rol = decodedToken?.rol || decodedToken?.authorities?.[0]?.authority;

          console.log('Rol extraído del token:', rol);

          if (rol === 'ROLE_ADMIN' || rol === 'ROLE_EMPLEADO') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        } catch (error) {
          console.error('Error al decodificar token JWT:', error);
          this.router.navigate(['/']); // fallback
        }
      },
      error: (err) => {
        console.error('❌ Error al hacer login', err);
        this.error = 'Email o contraseña incorrectos.';
      }
    });
  }
}
