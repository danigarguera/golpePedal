import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionDTO, DireccionService } from '../../services/direccion.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-direccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seleccionar-direccion.component.html'
})
export class SeleccionarDireccionComponent implements OnInit {
  direcciones: DireccionDTO[] = [];
  formDireccion!: FormGroup;
  usuarioId: number = 0;

  constructor(
    private direccionService: DireccionService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formDireccion = this.fb.group({
      alias: ['', [Validators.required, Validators.minLength(3)]],
      calle: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      piso: ['', [Validators.pattern(/^\d+$/)]],
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      provincia: ['', [Validators.required, Validators.minLength(3)]],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      pais: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.authService.getUsuarioActual().subscribe({
      next: (usuario) => {
        this.usuarioId = usuario.id;
        this.cargarDirecciones();
      },
      error: () => {
        Swal.fire({
          icon: 'info',
          title: 'Inicia sesión',
          text: 'Para finalizar la compra, por favor inicia sesión.',
          confirmButtonText: 'Ir al login',
          buttonsStyling: false,
          customClass: { confirmButton: 'btn btn-primario' }
        }).then(() => {
          this.router.navigate(['/login'], {
            queryParams: { redirectTo: '/seleccionar-direccion' }
          });
        });
      }
    });
  }

  cargarDirecciones(): void {
    this.direccionService.obtenerMisDirecciones().subscribe({
      next: (direcciones) => {
        this.direcciones = direcciones;
      },
      error: (err) => {
        console.error('❌ Error al cargar direcciones:', err);
        Swal.fire({
          title: '<i class="bi bi-x-circle-fill text-danger me-2"></i> Error',
          html: 'No se pudieron cargar tus direcciones.',
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: { confirmButton: 'btn btn-danger' }
        });
      }
    });
  }

  seleccionarDireccion(direccion: DireccionDTO): void {
    this.router.navigate(['/finalizar-compra'], {
      state: { direccionSeleccionada: direccion }
    });
  }

  onSubmit(): void {
    if (this.formDireccion.invalid) {
      this.formDireccion.markAllAsTouched();

      Swal.fire({
        title: '<i class="bi bi-exclamation-triangle-fill text-warning me-2"></i> Formulario inválido',
        html: 'Por favor, corrige los errores del formulario antes de continuar.',
        showConfirmButton: true,
        buttonsStyling: false,
        customClass: { confirmButton: 'btn btn-primario' }
      });
      return;
    }

    const nuevaDireccion: DireccionDTO = this.formDireccion.value;

    this.direccionService.crearDireccion(nuevaDireccion).subscribe({
      next: dir => {
        this.direcciones.push(dir);
        this.formDireccion.reset();

        Swal.fire({
          title: '<i class="bi bi-check-circle-fill text-success me-2"></i> Dirección añadida',
          html: 'La dirección se ha guardado correctamente.',
          showConfirmButton: false,
          timer: 1500,
          buttonsStyling: false
        });
      },
      error: err => {
        console.error('Error al crear dirección:', err);
        Swal.fire({
          title: '<i class="bi bi-x-circle-fill text-danger me-2"></i> Error',
          html: 'No se pudo guardar la dirección. Inténtalo de nuevo.',
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: { confirmButton: 'btn btn-danger' }
        });
      }
    });
  }
}
