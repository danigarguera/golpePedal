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
import { CarritoComponent } from './pages/carrito/carrito.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleGuard } from './guards/role.guard';

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

  { path: 'carrito', component: CarritoComponent },

  // ✅ Dashboard con vista de bienvenida como hijo
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLEADO'] }
  },


  // ✅ Crear pedido como ruta independiente
  {
    path: 'crear-pedido',
    loadComponent: () =>
      import('./pages/dashboard/crear-pedido/crear-pedido.component')
        .then(m => m.CrearPedidoComponent),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLEADO'] }
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
    loadComponent: () =>
      import('./pages/seleccionar-direccion/seleccionar-direccion.component').then(m => m.SeleccionarDireccionComponent)
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
  {
    path: 'dashboard/detalle-venta/:id',
    loadComponent: () => import('./pages/dashboard/detalle-venta/detalle-venta.component')
      .then(m => m.DetalleVentaComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'EMPLEADO'] }
  },
  {
    path: 'admin/ventas',
    loadComponent: () => import('./pages/admin/ventas-empleados/ventas-empleados.component')
      .then(m => m.VentasEmpleadosComponent)
  },

  {
    path: 'dashboard/componentes',
    loadComponent: () =>
      import('./pages/dashboard/gestionar-componentes/gestionar-componentes.component')
        .then(m => m.GestionarComponentesComponent),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'dashboard/componentes/nuevo',
    loadComponent: () =>
      import('./pages/dashboard/formulario-componente/formulario-componente.component')
        .then(m => m.FormularioComponenteComponent),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'dashboard/componentes/editar/:id',
    loadComponent: () =>
      import('./pages/dashboard/formulario-componente/formulario-componente.component')
        .then(m => m.FormularioComponenteComponent),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },


  { path: '**', redirectTo: '', pathMatch: 'full' }
];
