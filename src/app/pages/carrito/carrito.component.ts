import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CarritoService, ProductoCarrito } from '../../services/carrito.service';
import Swal from 'sweetalert2';



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

  vaciarCarrito(): void {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Esta acción eliminará todos los productos del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-trash-fill"></i> Sí, vaciar',
      cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
      customClass: {
        confirmButton: 'btn btn-primario me-2',
        cancelButton: 'btn btn-secundario'
      },
      buttonsStyling: false
    }).then(result => {
      if (result.isConfirmed) {
        this.carritoService.vaciarCarrito();
        this.cargarCarrito();

        Swal.fire({
          icon: 'success',
          title: 'Carrito vaciado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
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
  sumarCantidad(item: ProductoCarrito): void {
    item.cantidad++;
    this.carritoService.guardarCarrito(this.carrito);
    this.cargarCarrito();
  }

  restarCantidad(item: ProductoCarrito): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.guardarCarrito(this.carrito);
      this.cargarCarrito();
    } else {
      this.eliminarProducto(item.id);
    }
  }



}
