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
  ) {}

  registrarUsuario() {
    this.cargando = true; // 👉 Activa el spinner

    this.registroService.registrar(this.usuario).subscribe({
      next: response => {
        console.log('✅ Usuario registrado:', response);
        this.mensaje = '✅ ¡Usuario registrado exitosamente!';
        this.error = '';
        this.usuario = { nombre: '', apellido1: '', dni: '', telefono: '', email: '', password: '' };
        
        setTimeout(() => {
          this.cargando = false;
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: err => {
        console.error('❌ Error al registrar:', err);
        this.error = '❌ Error: El usuario ya existe o hubo un problema.';
        this.mensaje = '';
        this.cargando = false; // 👉 Desactiva el spinner también en error
      }
    });
  }
}
