import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { ProtectedComponent } from '../../shared/protected.component';
import { BotonVolverComponent } from '../../shared/boton-volver/boton-volver.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, BotonVolverComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent extends ProtectedComponent {
  usuarios: Usuario[] = [];
  error: string = '';

  usuariosService = inject(UsuariosService);

  constructor() {
    super();
  }

  override onInitAfterAuth(): void {
    if (this.rol !== 'ROLE_ADMIN') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.usuariosService.obtenerTodos().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => {
        console.error('❌ Error al cargar usuarios:', err);
        this.error = 'No se pudo cargar la lista de usuarios.';
      }
    });
  }
}
