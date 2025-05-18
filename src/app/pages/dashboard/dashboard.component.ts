import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  email: string = '';
  rol: string = '';

  constructor(
    private router: Router,
    public roleService: RoleService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.email = decoded.sub;
        this.rol = decoded.rol;
        console.log('📊 Dashboard cargado para:', this.email, 'con rol:', this.rol);
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
