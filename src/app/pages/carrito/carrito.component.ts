import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { CarritoService, ProductoCarrito } from '../../services/carrito.service';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: ProductoCarrito[] = [];

constructor(private carritoService: CarritoService, private router: Router) {}
  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminarProducto(id: number) {
    this.carritoService.eliminarProducto(id);
    this.cargarCarrito();
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.cargarCarrito();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((suma, prod) => suma + prod.precio * prod.cantidad, 0);
  }

  irASeleccionDireccion(): void {
  console.log('🧪 Validando sesión manualmente...');

  const token = localStorage.getItem('token');
  if (token) {
    console.log('✅ Token encontrado, navegando...');
    this.router.navigate(['/seleccionar-direccion']);
  } else {
    console.log('❌ Sin token, redirigiendo a login');
    alert('Debes iniciar sesión para continuar');
    this.router.navigate(['/login'], {
      queryParams: { redirectTo: '/seleccionar-direccion' }
    });
  }
}




}
