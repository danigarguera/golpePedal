import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  error = '';
  cargando = false;
  cambiandoRol: { [id: number]: boolean } = {};


  constructor(
    private router: Router,
    private roleService: RoleService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const rol = this.roleService.getRol();

    if (rol !== 'ROLE_ADMIN') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar usuarios:', err);
        this.error = 'No se pudo cargar la lista de usuarios.';
        this.cargando = false;
      }
    });
  }

  cambiarRol(usuario: Usuario): void {
    const nuevoRol = usuario.rol.nombre === 'ROLE_CLIENTE' ? 'ROLE_EMPLEADO' : 'ROLE_CLIENTE'; 

    this.usuarioService.cambiarRol(usuario.id, nuevoRol).subscribe({
      next: () => {
        usuario.rol = { ...usuario.rol, nombre: nuevoRol };
      },
      error: (err: any) => {
        console.error('❌ Error al cambiar rol:', err);
        this.error = 'No se pudo cambiar el rol del usuario.';
      }
    });

  }
}
