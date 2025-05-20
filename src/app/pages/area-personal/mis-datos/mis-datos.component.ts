import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuarioService, Usuario } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss']
})
export class MisDatosComponent implements OnInit {
  formUsuario!: FormGroup;
  mensaje: string = '';
  error: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.usuarioService.getDatosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.formUsuario = this.fb.group({
          nombre: [usuario.nombre, Validators.required],
          apellido1: [usuario.apellido1, Validators.required],
          apellido2: [usuario.apellido2],
          email: [{ value: usuario.email, disabled: true }],
          dni: [usuario.dni, Validators.required],
          telefono: [usuario.telefono, [Validators.required, Validators.pattern(/^\d{9}$/)]]
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al obtener datos de usuario', err);
        this.error = 'No se pudieron cargar los datos del usuario.';
      }
    });
  }

  guardarCambios(): void {
    if (this.formUsuario.invalid) return;

    const datosActualizados = this.formUsuario.getRawValue();

    this.usuarioService.actualizarDatosUsuario(datosActualizados).subscribe({
      next: () => {
        this.mensaje = '✅ Datos actualizados correctamente.';
        this.error = '';
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al actualizar datos:', err);
        this.mensaje = '';
        this.error = '❌ Error al actualizar los datos.';
      }
    });
  }
}
