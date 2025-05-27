import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  error = '';
  cargando = false;
  cambiandoRol: { [id: number]: boolean } = {};
  filtroEmail: string = '';
  usuariosFiltrados: Usuario[] = [];

  page: number = 1;
  pageSize: number = 10;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private usuarioService: UsuarioService
  ) {}

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
        this.filtrarUsuarios();
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
        this.error = 'No se pudo cargar la lista de usuarios.';
        this.cargando = false;
      }
    });
  }

  filtrarUsuarios(): void {
    const texto = this.filtroEmail.trim().toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.email.toLowerCase().includes(texto)
    );
    this.page = 1; // Reiniciar a la primera página si se filtra
  }

  cambiarRol(usuario: Usuario): void {
    const nuevoRol = usuario.rol.nombre === 'ROLE_CLIENTE' ? 'ROLE_EMPLEADO' : 'ROLE_CLIENTE';
    this.cambiandoRol[usuario.id] = true;

    this.usuarioService.cambiarRol(usuario.id, nuevoRol).subscribe({
      next: () => {
        usuario.rol = { ...usuario.rol, nombre: nuevoRol };
        this.cambiandoRol[usuario.id] = false;
      },
      error: (err: any) => {
        console.error('Error al cambiar rol:', err);
        this.error = 'No se pudo cambiar el rol del usuario.';
        this.cambiandoRol[usuario.id] = false;
      }
    });
  }

  get usuariosPaginados(): Usuario[] {
    const start = (this.page - 1) * this.pageSize;
    return this.usuariosFiltrados.slice(start, start + this.pageSize);
  }

  get totalPaginas(): number {
    return Math.ceil(this.usuariosFiltrados.length / this.pageSize);
  }
}
