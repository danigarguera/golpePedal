import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { RegistroService } from '../../services/registro.service';
import { CarritoService } from '../../services/carrito.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  mensaje = '';
  mostrarRegistro = false;

  usuario = {
    nombre: '', apellido1: '', apellido2: '',
    dni: '', telefono: '', email: '', password: ''
  };

  constructor(
    private loginService: LoginService,
    private registroService: RegistroService,
    private carritoService: CarritoService,
    private router: Router
  ) { }

  login(): void {
    this.error = '';
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.carritoService.refrescarContador?.();
        const decodedToken: any = jwtDecode(res.token);
        const rol = decodedToken?.rol || decodedToken?.authorities?.[0]?.authority;
        this.router.navigate([rol === 'ROLE_ADMIN' || rol === 'ROLE_EMPLEADO' ? '/dashboard' : '/']);
      },
      error: () => {
        this.error = 'Email o contraseña incorrectos.';
      }
    });
  }

  registrarUsuario(form?: any): void {
    this.error = '';
    this.mensaje = '';

    if (form?.invalid) {
      return; // detiene el envío si hay errores de Angular
    }

    this.registroService.registrar(this.usuario).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.mensaje = '¡Usuario registrado exitosamente!';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al registrar.';
      }
    });
  }

  ngOnInit(): void {
    // Esto es opcional si ya controlas desde fuera cuándo mostrarlo
  }

  toggleRegistro(): void {
    this.mostrarRegistro = !this.mostrarRegistro;
    this.error = '';
    this.mensaje = '';
  }

  continuarSinRegistrarse(): void {
    this.router.navigate(['/']);
  }


}
