import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { AfterViewInit } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, public roleService: RoleService) {}

  isLoggedIn(): boolean {
    return this.roleService.isAuthenticated();
  }

  getEmail(): string {
    return this.roleService.getEmail();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    // ✅ fuerza inicialización del dropdown
    const dropdownElement = document.querySelector('.dropdown-toggle');
    if (dropdownElement) {
      new bootstrap.Dropdown(dropdownElement);
    }
  }
}
