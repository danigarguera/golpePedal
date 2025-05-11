import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagenUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly claveLocalStorage = 'carrito';

  private contadorSubject = new BehaviorSubject<number>(this.obtenerCantidadTotal());
  contador$ = this.contadorSubject.asObservable();

  agregarProducto(producto: { id: number; nombre: string; precio: number; imagenUrl?: string }) {
    const carrito: ProductoCarrito[] = this.obtenerCarrito();
    const index = carrito.findIndex(p => p.id === producto.id);

    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem(this.claveLocalStorage, JSON.stringify(carrito));
    this.actualizarContador();
    alert('Producto añadido al carrito');
  }

  obtenerCarrito(): ProductoCarrito[] {
    const data = localStorage.getItem(this.claveLocalStorage);
    return data ? JSON.parse(data) : [];
  }

  eliminarProducto(id: number) {
    const carrito = this.obtenerCarrito().filter(p => p.id !== id);
    localStorage.setItem(this.claveLocalStorage, JSON.stringify(carrito));
    this.actualizarContador();
  }

  vaciarCarrito() {
    localStorage.removeItem(this.claveLocalStorage);
    this.actualizarContador();
  }

  refrescarContador() {
    this.contadorSubject.next(this.obtenerCantidadTotal());
  }

  private obtenerCantidadTotal(): number {
    return this.obtenerCarrito().reduce((total, p) => total + p.cantidad, 0);
  }

  private actualizarContador() {
    this.refrescarContador();
  }
}
