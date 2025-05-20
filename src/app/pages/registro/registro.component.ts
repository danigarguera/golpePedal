import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    telefono: '',
    email: '',
    password: ''
  };

  mensaje: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) { }

  registrarUsuario() {
    this.cargando = true;

    this.registroService.registrar(this.usuario).subscribe({
      next: response => {
        console.log('✅ Usuario registrado:', response);

        // 🔐 Guardar token
        localStorage.setItem('token', response.token);

        this.mensaje = '✅ ¡Usuario registrado exitosamente!';
        this.error = '';
        this.usuario = {
          nombre: '', apellido1: '', apellido2: '', dni: '', telefono: '', email: '', password: ''
        };

        this.cargando = false;

        // 🔁 Redirigir automáticamente al home
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('❌ Error al registrar:', err);
        this.error = err.error?.error || '❌ Error: El usuario ya existe o hubo un problema.';
        this.mensaje = '';
        this.cargando = false;
      }
    });
  }

}
