import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ComponentesComponent } from './pages/componentes/componentes.component'; // 👈 importa el nuevo componente
import { AuthGuard } from './guards/auth.guard'; // 👈 importa el guard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { 
    path: 'componentes', 
    component: ComponentesComponent, 
    canActivate: [AuthGuard] // 👈 protegemos la ruta
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent),
    canActivate: [AuthGuard]
  }, 
  
  {
    path: 'componentes/:id',
    loadComponent: () =>
      import('./pages/detalle-componente/detalle-componente.component').then(m => m.DetalleComponenteComponent),
    canActivate: [AuthGuard] // ✅ si usas protección
  },
  
  { path: '**', redirectTo: '' }
];
