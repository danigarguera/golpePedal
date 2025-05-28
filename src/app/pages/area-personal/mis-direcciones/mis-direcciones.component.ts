import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService, Direccion } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-direcciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mis-direcciones.component.html',
  styleUrls: ['./mis-direcciones.component.scss']
})
export class MisDireccionesComponent implements OnInit {
  direcciones: Direccion[] = [];
  formDireccion: FormGroup;
  mostrarFormulario = false;
  modoEdicion = false;
  direccionEditandoId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
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
    this.cargarDirecciones();
  }

  cargarDirecciones(): void {
    this.usuarioService.getDirecciones().subscribe({
      next: (data) => this.direcciones = data,
    });
  }

  iniciarNueva(): void {
    this.mostrarFormulario = true;
    this.modoEdicion = false;
    this.direccionEditandoId = null;
    this.formDireccion.reset();
  }

  editarDireccion(dir: Direccion): void {
    this.mostrarFormulario = true;
    this.modoEdicion = true;
    this.direccionEditandoId = dir.id;
    this.formDireccion.patchValue(dir);
  }

  eliminarDireccion(id: number): void {
    Swal.fire({
      title: '¿Eliminar dirección?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-trash-fill"></i> Eliminar',
      cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
      customClass: {
        confirmButton: 'btn btn-primario me-2',
        cancelButton: 'btn btn-secundario'
      },
      buttonsStyling: false
    }).then(result => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarDireccion(id).subscribe({
          next: () => this.cargarDirecciones(),
          error: (err) => {
            Swal.fire({
              title: '<i class="bi bi-exclamation-triangle-fill text-danger me-2"></i> Error',
              html: 'No se pudo eliminar la dirección.',
              showConfirmButton: true,
              buttonsStyling: false,
              customClass: { confirmButton: 'btn btn-danger' }
            });
          }
        });
      }
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

    const direccion = this.formDireccion.value;

    const esEdicion = this.modoEdicion && this.direccionEditandoId !== null;
    const request = esEdicion
      ? this.usuarioService.editarDireccion(this.direccionEditandoId!, direccion)
      : this.usuarioService.crearDireccion(direccion);

    const successMessage = esEdicion
      ? 'Dirección actualizada correctamente.'
      : 'Dirección creada correctamente.';

    const errorMessage = esEdicion
      ? 'No se pudo actualizar la dirección.'
      : 'No se pudo crear la dirección.';

    request.subscribe({
      next: () => {
        this.cargarDirecciones();
        this.mostrarFormulario = false;
        this.formDireccion.reset({}, { emitEvent: false });

        Swal.fire({
          title: '<i class="bi bi-check-circle-fill text-success me-2"></i> Éxito',
          html: successMessage,
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: { confirmButton: 'btn btn-primario' }
        });
      },
      error: (err) => {

        Swal.fire({
          title: '<i class="bi bi-x-circle-fill text-danger me-2"></i> Error',
          html: errorMessage,
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: { confirmButton: 'btn btn-danger' }
        });
      }
    });
  }
}
