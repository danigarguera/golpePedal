import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  mensaje: string = '';


  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('✅ Token guardado en localStorage:', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Error al hacer login', err);
        this.error = 'Email o contraseña incorrectos.';
      }
    });
    
  }
  
  
  
  
  
}
