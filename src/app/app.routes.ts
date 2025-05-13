import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ComponentesComponent } from './pages/componentes/componentes.component'; 
import { MisDatosComponent } from './pages/area-personal/mis-datos/mis-datos.component';
import { MisDireccionesComponent } from './pages/area-personal/mis-direcciones/mis-direcciones.component';
import { MisPedidosComponent } from './pages/area-personal/mis-pedidos/mis-pedidos.component';
import { AreaPersonalComponent } from './pages/area-personal/area-personal/area-personal.component';
import { AuthGuard } from './guards/auth.guard'; 
import { CarritoComponent } from './pages/carrito/carrito.component'; // 👈 NUEVO

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'componentes', component: ComponentesComponent },
  {
    path: 'componentes/:id',
    loadComponent: () =>
      import('./pages/detalle-componente/detalle-componente.component').then(m => m.DetalleComponenteComponent)
  },

  // 🔓 Carrito accesible para todos
  {
    path: 'carrito',
    component: CarritoComponent
  },

  // 🔐 Rutas protegidas
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
    path: 'area-personal',
    component: AreaPersonalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'datos', pathMatch: 'full' },
      { path: 'datos', component: MisDatosComponent },
      { path: 'direcciones', component: MisDireccionesComponent },
      { path: 'pedidos', component: MisPedidosComponent }
    ]
  },
  {
    path: 'seleccionar-direccion',
    loadComponent: () => import('./pages/seleccionar-direccion/seleccionar-direccion.component').then(m => m.SeleccionarDireccionComponent)
  },

  {
    path: 'finalizar-compra',
    loadComponent: () =>
    import('./pages/finalizar-compra/finalizar-compra.component').then(m => m.FinalizarCompraComponent)
  },

 {
  path: 'pedido/:id',
  loadComponent: () =>
    import('./pages/detalle-pedido/detalle-pedido.component').then(m => m.DetallePedidoComponent),
  canActivate: [AuthGuard]
  },




  { path: '**', redirectTo: '', pathMatch: 'full' }
];

