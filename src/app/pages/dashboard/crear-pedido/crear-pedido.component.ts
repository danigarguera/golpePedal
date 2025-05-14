// crear-pedido.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponenteDTO, MarcaDTO } from '../../../../../src/app/services/componentes.service';
import { DireccionDTO } from '../../../../../src/app/services/direccion.service';
import { UsuarioService, Usuario, PedidoComponenteDTO } from '../../../../../src/app/services/usuario.service';
import { DireccionService } from '../../../../../src/app/services/direccion.service';
import { PedidoService } from '../../../../../src/app/services/pedido.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';

@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-pedido.component.html'
})
export class CrearPedidoComponent implements OnInit {

  apiUrl = environment.apiUrl;

  clientes: Usuario[] = [];
  direcciones: DireccionDTO[] = [];
  tiposComponente: { id: number, nombre: string }[] = [];
  componentesFiltrados: ComponenteDTO[] = [];
  marcas: MarcaDTO[] = [];


  clienteSeleccionadoId: number | null = null;
  direccionSeleccionadaId: number | null = null;
  tipoSeleccionado: number | null = null;
  marcaSeleccionada: number | null = null;


  carrito: PedidoComponenteDTO[] = [];

  mensaje = '';
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private direccionService: DireccionService,
    private pedidoService: PedidoService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarTiposComponente();
    this.cargarMarcas();

  }

  cargarClientes() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (res: Usuario[]) => this.clientes = res,
      error: () => this.error = 'Error cargando clientes.'
    });
  }

  onClienteChange() {
    if (this.clienteSeleccionadoId) {
      this.direccionService.obtenerDireccionesPorUsuario(this.clienteSeleccionadoId).subscribe({
        next: (res: DireccionDTO[]) => this.direcciones = res,
        error: () => this.error = 'Error cargando direcciones.'
      });
    }
  }

  cargarTiposComponente() {
    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-componente`).subscribe({
      next: (res) => this.tiposComponente = res,
      error: () => this.error = 'Error cargando tipos de componente.'
    });
  }

  filtrarComponentesPorTipo() {
    if (!this.tipoSeleccionado) return;

    const params = new URLSearchParams();
    params.append('tipoComponenteId', this.tipoSeleccionado.toString());
    if (this.marcaSeleccionada) {
      params.append('marcaId', this.marcaSeleccionada.toString());
    }

    this.http.get<ComponenteDTO[]>(`${this.apiUrl}/componentes/buscar?${params.toString()}`).subscribe({
      next: (res) => this.componentesFiltrados = res,
      error: () => this.error = 'Error filtrando componentes.'
    });
  }


  anadirAlCarrito(componente: ComponenteDTO) {
    const existente = this.carrito.find(c => c.componenteId === componente.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.carrito.push({
        componenteId: componente.id,
        nombre: componente.nombre,
        descripcion: componente.descripcion,
        precio: componente.precio,
        cantidad: 1
      });
    }
  }

  eliminarDelCarrito(componenteId: number) {
    this.carrito = this.carrito.filter(c => c.componenteId !== componenteId);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, c) => total + (c.precio * c.cantidad), 0);
  }

  cargarMarcas() {
    this.http.get<MarcaDTO[]>(`${this.apiUrl}/marcas`).subscribe({
      next: res => this.marcas = res,
      error: () => this.error = 'Error cargando marcas.'
    });
  }

  crearPedido() {
    if (!this.clienteSeleccionadoId || !this.direccionSeleccionadaId || this.carrito.length === 0) {
      this.error = 'Completa todos los campos antes de crear el pedido.';
      return;
    }

    const body = {
      usuarioId: this.clienteSeleccionadoId,
      direccionId: this.direccionSeleccionadaId,
      lineas: this.carrito.map(c => ({
        componenteId: c.componenteId,
        cantidad: c.cantidad,
        precioUnitario: c.precio
      }))
    };

    this.pedidoService.crearPedidoComoEmpleado(body).subscribe({
      next: () => {
        this.mensaje = '✅ Pedido creado exitosamente';
        this.error = '';
        this.carrito = [];
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },



      error: () => {
        this.error = '❌ Error al crear el pedido';
        this.mensaje = '';
      }
    });
  }
}
