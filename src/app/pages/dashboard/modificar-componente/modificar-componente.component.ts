import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComponentesService, ComponenteDTO, MarcaDTO } from '../../../services/componentes.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modificar-componente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './modificar-componente.component.html'
})
export class ModificarComponenteComponent implements OnInit {
  formulario!: FormGroup;
  id!: number;
  tipoComponenteNombre = '';
  marcaNombre = '';
  tipoBicicletaNombre = '';

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

    this.formulario = this.fb.group({
      nombre: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      tipoComponenteId: [''],
      marcaId: [''],
      tipoBicicletaId: ['']
    });

    this.componentesService.obtenerPorId(this.id).subscribe({
      next: (componente) => {
        console.log('📦 Componente cargado:', componente);

        this.formulario.patchValue({
          nombre: componente.nombre,
          descripcion: componente.descripcion,
          precio: componente.precio,
          tipoComponenteId: componente.tipoComponenteId,
          marcaId: componente.marcaId,
          tipoBicicletaId: componente.tipoBicicletaId
        });

        this.tipoComponenteNombre = componente.tipo ?? '';
        this.marcaNombre = componente.marca ?? '';
        this.tipoBicicletaNombre = componente.tipoBicicleta ?? '';
      },
      error: () => this.router.navigate(['/dashboard/componentes'])
    });
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const formData = this.formulario.getRawValue();

    const dto: ComponenteDTO = {
      id: this.id,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      tipoComponenteId: formData.tipoComponenteId,
      marcaId: formData.marcaId,
      tipoBicicletaId: formData.tipoBicicletaId
    };

    this.componentesService.actualizarComponente(this.id, dto).subscribe({
      next: () => this.router.navigate(['/dashboard/componentes']),
      error: (err) => console.error('Error al actualizar componente:', err)
    });
  }
}
