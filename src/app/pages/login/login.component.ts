import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CarritoService } from '../../services/carrito.service';

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
  ) {}

  login() {
    this.error = '';
    this.mensaje = '';

    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        // Guardar token
        localStorage.setItem('token', res.token);
        console.log('✅ Token guardado en localStorage:', res.token);

        // Refrescar contador del carrito (en caso de carrito anónimo)
        this.carritoService.refrescarContador?.();

        // Redirigir a dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Error al hacer login', err);
        this.error = 'Email o contraseña incorrectos.';
      }
    });
  }
}
