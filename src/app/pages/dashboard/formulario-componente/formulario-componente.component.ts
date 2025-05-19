import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentesService, Componente, MarcaDTO } from '../../../services/componentes.service';
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
  id?: number;
  modoEdicion = false;

  marcas: MarcaDTO[] = [];
  tiposComponente: { id: number, nombre: string }[] = [];
  tiposBicicleta: { id: number, nombre: string }[] = [];

  private apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private componentesService: ComponentesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.modoEdicion = !!this.id;

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      tipoComponenteId: [null, Validators.required],
      marcaId: [null, Validators.required],
      tipoBicicletaId: [null, Validators.required]
    });

    this.cargarSelects();

    if (this.modoEdicion) {
      this.componentesService.obtenerPorId(this.id!).subscribe({
        next: (componente) => {
          this.formulario.patchValue(componente);
        },
        error: (err) => {
          console.error('❌ Error al obtener componente:', err);
          this.router.navigate(['/dashboard/componentes']);
        }
      });
    }
  }

  cargarSelects(): void {
    this.http.get<MarcaDTO[]>(`${this.apiUrl}/marcas`).subscribe({
      next: res => this.marcas = res,
      error: err => console.error('❌ Error al cargar marcas:', err)
    });

    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-componente`).subscribe({
      next: res => this.tiposComponente = res,
      error: err => console.error('❌ Error al cargar tipos de componente:', err)
    });

    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-bicicleta`).subscribe({
      next: res => this.tiposBicicleta = res,
      error: err => console.error('❌ Error al cargar tipos de bicicleta:', err)
    });
  }

  guardar() {
    if (this.formulario.invalid) return;

    const datos = this.formulario.value;

    if (this.modoEdicion) {
      this.componentesService.actualizarComponente(this.id!, datos).subscribe({
        next: () => {
          console.log('✅ Componente actualizado');
          this.router.navigate(['/dashboard/componentes']);
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      this.componentesService.crearComponente(datos).subscribe({
        next: () => {
          console.log('✅ Componente creado');
          this.router.navigate(['/dashboard/componentes']);
        },
        error: (err) => console.error('❌ Error al crear:', err)
      });
    }
  }
}
