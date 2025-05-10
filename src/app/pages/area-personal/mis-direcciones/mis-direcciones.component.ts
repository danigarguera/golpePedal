import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService, Direccion } from '../../../services/usuario.service';
import { BotonVolverComponent } from '../../../shared/boton-volver/boton-volver.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-direcciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BotonVolverComponent],
  templateUrl: './mis-direcciones.component.html',
  styleUrls: ['./mis-direcciones.component.css']
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
      alias: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      piso: [''],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDirecciones();
  }

  cargarDirecciones(): void {
    this.usuarioService.getDirecciones().subscribe({
      next: (data) => this.direcciones = data,
      error: (err) => console.error('❌ Error al obtener direcciones', err)
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
    if (confirm('¿Seguro que deseas eliminar esta dirección?')) {
      this.usuarioService.eliminarDireccion(id).subscribe({
        next: () => this.cargarDirecciones(),
        error: (err) => console.error('❌ Error al eliminar dirección', err)
      });
    }
  }

  onSubmit(): void {
    if (this.formDireccion.invalid) return;

    const direccion = this.formDireccion.value;

    if (this.modoEdicion && this.direccionEditandoId !== null) {
      this.usuarioService.editarDireccion(this.direccionEditandoId, direccion).subscribe({
        next: () => {
          this.cargarDirecciones();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error('❌ Error al actualizar dirección', err)
      });
    } else {
      this.usuarioService.crearDireccion(direccion).subscribe({
        next: () => {
          this.cargarDirecciones();
          this.formDireccion.reset();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error('❌ Error al crear dirección', err)
      });
    }
  }
}
