import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ComponentesService, ComponenteDTO, MarcaDTO } from '../../../services/componentes.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-formulario-componente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-componente.component.html'
})
export class FormularioComponenteComponent implements OnInit {
  formulario!: FormGroup;
  marcas: MarcaDTO[] = [];
  tiposComponente: { id: number, nombre: string }[] = [];
  tiposBicicleta: { id: number, nombre: string }[] = [];
  imagenSeleccionada: File | null = null;


  private apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private componentesService: ComponentesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]],
      tipoComponenteId: [null, Validators.required],
      marcaId: [null, Validators.required],
      tipoBicicletaId: [null, Validators.required]
    });

    this.cargarSelects();
  }

  cargarSelects(): void {
    this.http.get<MarcaDTO[]>(`${this.apiUrl}/marcas`).subscribe({
      next: res => this.marcas = res,
      error: err => console.error('Error al cargar marcas:', err)
    });

    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-componente`).subscribe({
      next: res => this.tiposComponente = res,
      error: err => console.error('Error al cargar tipos de componente:', err)
    });

    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-bicicleta`).subscribe({
      next: res => this.tiposBicicleta = res,
      error: err => console.error('Error al cargar tipos de bicicleta:', err)
    });
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const dto: ComponenteDTO = this.formulario.getRawValue();

    this.componentesService.crearComponente(dto).subscribe({
      next: (nuevoComponente) => {
        const id = nuevoComponente?.id;

        if (this.imagenSeleccionada && typeof id === 'number') {
          this.subirImagen(id);
        } else {
          this.router.navigate(['/dashboard/componentes']);
        }
      },
      error: (err) => console.error('Error al crear componente:', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagenSeleccionada = input.files[0];
    }
  }

  subirImagen(componenteId: number): void {
    const formData = new FormData();
    formData.append('file', this.imagenSeleccionada!);

    this.http.post(`${this.apiUrl}/componentes/${componenteId}/imagen`, formData).subscribe({
      next: () => this.router.navigate(['/dashboard/componentes']),
      error: err => {
        console.error('Error al subir imagen:', err);
      }
    });

  }
}