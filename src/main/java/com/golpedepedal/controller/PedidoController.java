package com.golpedepedal.controller;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.golpedepedal.dto.PedidoGestionDTO;
import com.golpedepedal.dto.PedidoMapper;
import com.golpedepedal.dto.PedidoRequestDTO;
import com.golpedepedal.dto.PedidoRequestDTO.LineaPedidoDTO;
import com.golpedepedal.dto.PedidoResponseDTO;
import com.golpedepedal.dto.PedidoResumenDTO;
import com.golpedepedal.dto.VentaEmpleadoDTO;
import com.golpedepedal.model.Componente;
import com.golpedepedal.model.Direccion;
import com.golpedepedal.model.Pedido;
import com.golpedepedal.model.Pedido.Estado;
import com.golpedepedal.model.PedidoComponente;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.ComponenteRepository;
import com.golpedepedal.repository.DireccionRepository;
import com.golpedepedal.repository.PedidoRepository;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    
    private final PedidoService service;
    private final UsuarioRepository usuarioRepository;
    private final ComponenteRepository componenteRepository;
    private final PedidoRepository pedidoRepository;
    
    
    public PedidoController(PedidoService service,  
    						UsuarioRepository usuarioRepository, 
    						DireccionRepository direccionRepository, 
    						ComponenteRepository componenteRepository,
    						PedidoRepository pedidoRepository) { 
    	
        this.service = service; 
        this.usuarioRepository = usuarioRepository; 
        this.componenteRepository = componenteRepository; 
        this.pedidoRepository = pedidoRepository; 
    }
    
    @GetMapping 
    public List<Pedido> listar() {
        return service.obtenerTodos(); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponseDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPedidoDetallePorId(id));
    }

    @PutMapping("/{id}") 
    public Pedido actualizar(@PathVariable Long id, @RequestBody Pedido p) {
        p.setId(id); 
        return service.guardar(p); 
    }

    @DeleteMapping("/{id}") 
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id); 
    }

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody PedidoRequestDTO pedidoDTO) {
        try {
            PedidoResponseDTO response = service.crearPedidoDesdeDTO(pedidoDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear el pedido: " + e.getMessage());
        }
    }
    
    @GetMapping("/mios")
    public List<PedidoResumenDTO> obtenerPedidosResumenPorEmail(Principal principal) {
        String email = principal.getName(); 

        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Pedido> pedidos = pedidoRepository.findByUsuarioAndDireccionIsNotNull(usuario);

        return pedidos.stream()
            .map(p -> new PedidoResumenDTO(
                p.getId(),
                p.getFecha(),
                p.getEstado().name(),
                p.getTotal(),
                p.getDireccion().getAlias()
            ))
            .toList();
    }


    @PostMapping("/crear-empleado")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
    public PedidoResponseDTO crearPedidoComoEmpleado(@RequestBody PedidoRequestDTO dto,
                                                     Authentication authentication) {
        String emailEmpleado = authentication.getName();

        Usuario empleado = usuarioRepository.findByEmail(emailEmpleado)
            .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        Usuario cliente = usuarioRepository.findById(dto.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(cliente);
        pedido.setEmpleado(empleado);
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(Pedido.Estado.ENTREGADO);
        pedido.setTotal(BigDecimal.ZERO);
        pedido.setPedidoComponentes(new ArrayList<>()); 

        BigDecimal total = BigDecimal.ZERO;

        for (LineaPedidoDTO lineaDTO : dto.getLineas()) {
            Componente componente = componenteRepository.findById(lineaDTO.getComponenteId())
                .orElseThrow(() -> new RuntimeException("Componente no encontrado"));

            PedidoComponente linea = new PedidoComponente();
            linea.setPedido(pedido);
            linea.setComponente(componente);
            linea.setCantidad(lineaDTO.getCantidad());

            pedido.getPedidoComponentes().add(linea);

            BigDecimal subtotal = componente.getPrecio().multiply(BigDecimal.valueOf(lineaDTO.getCantidad()));
            total = total.add(subtotal);
        }

        pedido.setTotal(total);
        Pedido guardado = pedidoRepository.save(pedido);

        return PedidoMapper.toDTO(guardado); 
    }

    @GetMapping("/por-empleados")
    @PreAuthorize("hasRole('ADMIN')")
    public List<VentaEmpleadoDTO> obtenerVentasPorEmpleados(
            @RequestParam(required = false) String desde,
            @RequestParam(required = false) String hasta,
            @RequestParam(required = false) Long empleadoId) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDateTime fechaDesde = (desde != null)
                ? LocalDate.parse(desde, formatter).atStartOfDay()
                : LocalDateTime.MIN;

        LocalDateTime fechaHasta = (hasta != null)
                ? LocalDate.parse(hasta, formatter).atTime(23, 59, 59)
                : LocalDateTime.now();

        List<Pedido> pedidos;

        if (empleadoId != null) {
            pedidos = pedidoRepository.findByEmpleadoIdAndFechaBetween(empleadoId, fechaDesde, fechaHasta);
        } else {
            pedidos = pedidoRepository.findByEmpleadoNotNullAndFechaBetween(fechaDesde, fechaHasta);
        }

        return pedidos.stream().map(p -> new VentaEmpleadoDTO(
                p.getId(),
                p.getFecha(),
                p.getUsuario().getNombre() + " " + p.getUsuario().getApellido1(),
                p.getEmpleado().getNombre() + " " + p.getEmpleado().getApellido1(),
                p.getTotal()
        )).toList();
    }

    
    @GetMapping("/por-clientes")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
    public List<PedidoGestionDTO> obtenerPedidosDeClientes(
            @RequestParam(required = false) String desde,
            @RequestParam(required = false) String hasta,
            @RequestParam(required = false) String estado
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDateTime fechaDesde = (desde != null)
                ? LocalDate.parse(desde, formatter).atStartOfDay()
                : LocalDateTime.MIN;

        LocalDateTime fechaHasta = (hasta != null)
                ? LocalDate.parse(hasta, formatter).atTime(23, 59, 59)
                : LocalDateTime.now();

        List<Pedido> pedidos = pedidoRepository.findByDireccionNotNullAndFechaBetween(fechaDesde, fechaHasta);

        if (estado != null && !estado.isBlank()) {
            pedidos = pedidos.stream()
                    .filter(p -> p.getEstado().name().equalsIgnoreCase(estado))
                    .toList();
        }

        return pedidos.stream()
                .map(PedidoMapper::toGestionDTO)
                .toList();
    }


    @PutMapping("/{id}/estado")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody String nuevoEstadoRaw) {
        String estadoLimpio = nuevoEstadoRaw.replace("\"", "").trim();

        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        Estado nuevoEstado = Estado.valueOf(estadoLimpio);

        if (!pedido.getEstado().equals(nuevoEstado)) {
            pedido.setEstado(nuevoEstado);
            pedidoRepository.save(pedido);
        }

        return ResponseEntity.ok().build();
    }



}
