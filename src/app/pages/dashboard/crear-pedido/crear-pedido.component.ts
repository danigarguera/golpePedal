// crear-pedido.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponenteDTO, MarcaDTO } from '../../../../../src/app/services/componentes.service';
import { DireccionDTO, DireccionCreateEmpleadoDTO } from '../../../../../src/app/services/direccion.service';
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
  direccionSeleccionadaId: number | undefined;
  tipoSeleccionado: number | null = null;
  marcaSeleccionada: number | null = null;

  ordenActual: { campo: string, ascendente: boolean } = { campo: 'nombre', ascendente: true };

  carrito: PedidoComponenteDTO[] = [];
  mensaje = '';
  error = '';

  nuevaDireccion: Partial<DireccionDTO> = {};
  mostrarFormularioDireccion = false;

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
    this.direccionSeleccionadaId = undefined;
    this.mostrarFormularioDireccion = false;
    this.direcciones = [];

    if (this.clienteSeleccionadoId) {
      this.direccionService.obtenerDireccionesPorUsuario(this.clienteSeleccionadoId).subscribe({
        next: (res: DireccionDTO[]) => {
          this.direcciones = res;
          if (res.length === 0) this.mostrarFormularioDireccion = true;
        },
        error: () => this.error = 'Error cargando direcciones.'
      });
    }
  }

  onDireccionChange() {
    this.mostrarFormularioDireccion = this.direccionSeleccionadaId === -1;
  }

  guardarNuevaDireccion() {
    if (!this.clienteSeleccionadoId || !this.nuevaDireccion.calle || !this.nuevaDireccion.ciudad) {
      this.error = 'Faltan campos obligatorios para la dirección.';
      return;
    }

    const direccionAGuardar: DireccionCreateEmpleadoDTO = {
      alias: this.nuevaDireccion.alias ?? '',
      calle: this.nuevaDireccion.calle ?? '',
      numero: this.nuevaDireccion.numero ?? '',
      piso: this.nuevaDireccion.piso ?? '',
      ciudad: this.nuevaDireccion.ciudad ?? '',
      provincia: this.nuevaDireccion.provincia ?? '',
      codigoPostal: this.nuevaDireccion.codigoPostal ?? '',
      pais: this.nuevaDireccion.pais ?? '',
      usuarioId: this.clienteSeleccionadoId
    };

    this.direccionService.crearDireccionComoEmpleado(direccionAGuardar).subscribe({
      next: (dir) => {
        this.direcciones.push(dir);
        this.direccionSeleccionadaId = dir.id;
        this.mostrarFormularioDireccion = false;
        this.nuevaDireccion = {};
      },
      error: () => this.error = 'Error al guardar la dirección.'
    });
  }

  cargarTiposComponente() {
    this.http.get<{ id: number, nombre: string }[]>(`${this.apiUrl}/tipos-componente`).subscribe({
      next: (res) => {
        this.tiposComponente = [{ id: 0, nombre: '-- Todos los tipos --' }, ...res];
      },
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

    // SOLO añadimos el parámetro si tipoSeleccionado > 0
    if (this.tipoSeleccionado !== null && this.tipoSeleccionado > 0) {
      params.append('tipoComponenteId', this.tipoSeleccionado.toString());
    }

    if (this.marcaSeleccionada) {
      params.append('marcaId', this.marcaSeleccionada.toString());
    }

    console.log('📦 Buscando componentes con:', params.toString());

    this.http.get<ComponenteDTO[]>(`${this.apiUrl}/componentes/buscar?${params.toString()}`).subscribe({
      next: (res) => {
        console.log('🔎 Resultado:', res);
        this.componentesFiltrados = res;
      },
      error: () => this.error = 'Error filtrando componentes.'
    });
  }


  ordenarPor(campo: 'nombre' | 'marca' | 'precio') {
    if (this.ordenActual.campo === campo) {
      this.ordenActual.ascendente = !this.ordenActual.ascendente;
    } else {
      this.ordenActual = { campo, ascendente: true };
    }

    this.componentesFiltrados.sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];
      if (valorA < valorB) return this.ordenActual.ascendente ? -1 : 1;
      if (valorA > valorB) return this.ordenActual.ascendente ? 1 : -1;
      return 0;
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

  crearPedido() {
    if (this.clienteSeleccionadoId == null || this.direccionSeleccionadaId == null || this.carrito.length === 0) {
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
