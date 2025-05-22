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
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: ProductoCarrito[] = [];
  mostrarAvisoLogin = false;


  constructor(private carritoService: CarritoService, private router: Router) { }
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
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/seleccionar-direccion']);
    } else {
      this.mostrarAvisoLogin = true;

      // Oculta el aviso después de 3 segundos
      setTimeout(() => {
        this.mostrarAvisoLogin = false;
      }, 1500);
    }
  }





}
