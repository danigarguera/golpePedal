import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, Usuario } from '../../../services/usuario.service';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getDatosUsuario().subscribe({
      next: (data) => this.usuario = data,
      error: (err) => console.error('❌ Error al obtener datos de usuario', err)
    });
  }
}
