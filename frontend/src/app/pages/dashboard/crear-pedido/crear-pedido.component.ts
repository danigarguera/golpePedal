import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
import { ComponenteDTO, MarcaDTO } from '../../../../../src/app/services/componentes.service';
import { UsuarioService, Usuario, PedidoComponenteDTO } from '../../../../../src/app/services/usuario.service';
import { PedidoService, PedidoRequestDTO } from '../../../../../src/app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-pedido.component.html'
})
export class CrearPedidoComponent implements OnInit {
  apiUrl = environment.apiUrl;

  clientes: Usuario[] = [];
  tiposComponente: { id: number, nombre: string }[] = [];
  componentesFiltrados: ComponenteDTO[] = [];
  marcas: MarcaDTO[] = [];

  clienteSeleccionadoId: number | null = null;
  tipoSeleccionado: number | null = null;
  marcaSeleccionada: number | null = null;

  campoOrden: string = '';
  direccionOrden: 'asc' | 'desc' = 'asc';

  carrito: PedidoComponenteDTO[] = [];
  mensaje = '';
  error = '';

  paginaActual: number = 1;
  elementosPorPagina: number = 10;

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarTiposComponente();
    this.cargarMarcas();
    this.cargarTodosLosComponentes();
  }

  cargarClientes() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (res: Usuario[]) => this.clientes = res,
      error: () => this.error = 'Error cargando clientes.'
    });
  }

  cargarTiposComponente() {
    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-componente`).subscribe({
      next: res => this.tiposComponente = res,
      error: () => this.error = 'Error cargando tipos de componente.'
    });
  }

  cargarMarcas() {
    this.http.get<MarcaDTO[]>(`${this.apiUrl}/marcas`).subscribe({
      next: res => this.marcas = res,
      error: () => this.error = 'Error cargando marcas.'
    });
  }

  filtrarComponentesPorTipo() {
    const params = new URLSearchParams();

    if (this.tipoSeleccionado !== null && this.tipoSeleccionado > 0) {
      params.append('tipoComponenteId', this.tipoSeleccionado.toString());
    }

    if (this.marcaSeleccionada) {
      params.append('marcaId', this.marcaSeleccionada.toString());
    }

    this.http.get<ComponenteDTO[]>(`${this.apiUrl}/componentes/buscar?${params.toString()}`).subscribe({
      next: (res) => {
        this.componentesFiltrados = res;
        this.paginaActual = 1;
      },
      error: () => this.error = 'Error filtrando componentes.'
    });
  }

  ordenarPor(campo: string): void {
    if (this.campoOrden === campo) {
      this.direccionOrden = this.direccionOrden === 'asc' ? 'desc' : 'asc';
    } else {
      this.campoOrden = campo;
      this.direccionOrden = 'asc';
    }

    this.componentesFiltrados.sort((a: any, b: any) => {
      const valorA = a[campo];
      const valorB = b[campo];

      if (valorA < valorB) return this.direccionOrden === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.direccionOrden === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get componentesPaginados(): ComponenteDTO[] {
    const start = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.componentesFiltrados.slice(start, start + this.elementosPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.componentesFiltrados.length / this.elementosPorPagina);
  }

  anadirAlCarrito(componente: ComponenteDTO) {
    const existente = this.carrito.find(c => c.componenteId === componente.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.carrito.push({
        componenteId: componente.id!,
        nombre: componente.nombre,
        descripcion: componente.descripcion,
        precio: componente.precio,
        cantidad: 1
      });
    }
  }

  cargarTodosLosComponentes() {
    this.http.get<ComponenteDTO[]>(`${this.apiUrl}/componentes`).subscribe({
      next: (res) => {
        this.componentesFiltrados = res;
        this.paginaActual = 1;
      },
      error: () => this.error = 'Error cargando los componentes.'
    });
  }

  eliminarDelCarrito(componenteId: number) {
    this.carrito = this.carrito.filter(c => c.componenteId !== componenteId);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, c) => total + (c.precio * c.cantidad), 0);
  }

  crearPedido() {
    if (!this.clienteSeleccionadoId || this.carrito.length === 0) {
      this.error = 'Completa cliente y carrito antes de crear el pedido.';
      return;
    }

    const body: PedidoRequestDTO = {
      usuarioId: this.clienteSeleccionadoId!,
      direccionId: null,
      lineas: this.carrito.map(c => ({
        componenteId: c.componenteId,
        cantidad: c.cantidad,
        precioUnitario: c.precio
      }))
    };

    this.pedidoService.crearPedidoComoEmpleado(body).subscribe({
      next: (pedidoCreado) => {
        this.mensaje = '';
        this.error = '';
        this.carrito = [];

        Swal.fire({
          title: '<i class="bi bi-check-circle-fill text-success me-2"></i> Pedido creado',
          html: 'El pedido ha sido creado correctamente.',
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primario'
          }
        }).then(() => {
          this.router.navigate(['/dashboard/detalle-venta', pedidoCreado.id], {
            state: { pedido: pedidoCreado }
          });
        });
      },
      error: () => {
        this.error = '';
        this.mensaje = '';

        Swal.fire({
          title: '<i class="bi bi-exclamation-triangle-fill text-danger me-2"></i> Error',
          html: 'No se pudo crear el pedido.',
          showConfirmButton: true,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
      }
    });
  }
}
