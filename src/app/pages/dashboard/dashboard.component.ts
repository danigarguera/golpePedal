import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string = '';
  rol: string = '';

  constructor(
    private router: Router,
    public roleService: RoleService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.email = decoded.sub;

        const rawRol = decoded.rol;

        switch (rawRol) {
          case 'ROLE_ADMIN':
            this.rol = 'Administrador';
            break;
          case 'ROLE_EMPLEADO':
            this.rol = 'Empleado';
            break;
          case 'ROLE_CLIENTE':
            this.rol = 'Cliente';
            break;
          default:
            this.rol = rawRol?.replace('ROLE_', '') || 'Desconocido';
            break;
        }

      } catch (e) {
        console.error('❌ Error al decodificar token');
      }
    }
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
