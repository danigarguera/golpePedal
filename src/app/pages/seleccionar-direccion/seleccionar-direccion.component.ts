// seleccionar-direccion.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionDTO, DireccionService } from '../../services/direccion.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // ajusta si necesario

@Component({
  selector: 'app-seleccionar-direccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seleccionar-direccion.component.html'
})
export class SeleccionarDireccionComponent implements OnInit {
  direcciones: DireccionDTO[] = [];
  nuevaDireccion: DireccionDTO = this.inicializarDireccion();
  usuarioId: number = 0; 

  constructor(private direccionService: DireccionService, private router: Router,   private authService: AuthService) {
     console.log('📌 Constructor SeleccionarDireccionComponent');
  }
  
ngOnInit(): void {
  this.authService.getUsuarioActual().subscribe({
    next: (usuario) => {
      this.usuarioId = usuario.id;
      this.cargarDirecciones();
    },
    error: () => {
      alert('Para finalizar la compra, por favor inicia sesión.');
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: '/seleccionar-direccion' }
      });
    }
  });
}


cargarDirecciones(): void {
  this.direccionService.obtenerMisDirecciones().subscribe({
    next: (direcciones) => {
      console.log('✅ Direcciones cargadas:', direcciones);
      this.direcciones = direcciones;
    },
    error: (err) => {
      console.error('❌ Error al cargar direcciones:', err);
      alert('No se pudieron cargar tus direcciones.');
    }
  });
}


  seleccionarDireccion(direccion: DireccionDTO): void {
    console.log('🧭 Navegando con dirección:', direccion);
    this.router.navigate(['/finalizar-compra'], {
      state: { direccionSeleccionada: direccion }
    });
  }

  crearDireccion(): void {
    this.direccionService.crearDireccion(this.nuevaDireccion).subscribe({
      next: dir => {
        this.direcciones.push(dir);
        this.nuevaDireccion = this.inicializarDireccion();
        alert('Dirección añadida correctamente');
      },
      error: err => console.error('Error al crear dirección:', err)
    });
  }

  private inicializarDireccion(): DireccionDTO {
    return {
      alias: '', calle: '', numero: '', piso: '', ciudad: '', provincia: '', codigoPostal: '', pais: ''
    };
  }
}
