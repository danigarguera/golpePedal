package com.golpedepedal.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.dto.DireccionDTO;
import com.golpedepedal.dto.LineaPedidoResponseDTO;
import com.golpedepedal.dto.PedidoMapper;
import com.golpedepedal.dto.PedidoRequestDTO;
import com.golpedepedal.dto.PedidoResponseDTO;
import com.golpedepedal.dto.PedidoResumenDTO;
import com.golpedepedal.dto.UsuarioFacturaDTO;
import com.golpedepedal.model.Componente;
import com.golpedepedal.model.Direccion;
import com.golpedepedal.model.Pedido;
import com.golpedepedal.model.Pedido.Estado;
import com.golpedepedal.model.PedidoComponente;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.ComponenteRepository;
import com.golpedepedal.repository.DireccionRepository;
import com.golpedepedal.repository.PedidoComponenteRepository;
import com.golpedepedal.repository.PedidoRepository;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.service.PedidoService;

@Service
public class PedidoServiceImpl implements PedidoService {
	
    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PedidoComponenteRepository pedidoComponenteRepository;
    private final ComponenteRepository componenteRepository;
    private final DireccionRepository direccionRepository;
    
    public PedidoServiceImpl(PedidoRepository pedidoRepository, 
    						UsuarioRepository usuarioRepository, 
    						PedidoComponenteRepository pedidoComponenteRepository, 
    						ComponenteRepository componenteRepository,
    						DireccionRepository direccionRepository) {
    	
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.pedidoComponenteRepository = pedidoComponenteRepository;
        this.componenteRepository = componenteRepository;
        this.direccionRepository = direccionRepository;
    }

	@Override
	public List<Pedido> obtenerTodos() {
		
		return pedidoRepository.findAll();
	}

	@Override
	public Pedido guardar(Pedido pedido) {
		
		return pedidoRepository.save(pedido);
	}

	@Override
	public Optional<Pedido> buscarPorId(Long id) {
		
		return pedidoRepository.findById(id);
	}

	@Override
	public void eliminar(Long id) {
		
		pedidoRepository.deleteById(id);
		
	}

	@Override
	public PedidoResponseDTO crearPedidoDesdeDTO(PedidoRequestDTO dto) {
	    Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
	        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	    
	    Direccion direccion = direccionRepository.findById(dto.getDireccionId())
	        .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

	    Pedido pedido = new Pedido();
	    pedido.setUsuario(usuario);
	    pedido.setDireccion(direccion); 
	    pedido.setFecha(LocalDateTime.now());
	    pedido.setEstado(Estado.PENDIENTE);
	    
	    pedido.setNumeroPedido(generarNumeroPedido());


	    pedido = pedidoRepository.save(pedido);

	    BigDecimal total = BigDecimal.ZERO;

	    for (PedidoRequestDTO.LineaPedidoDTO lineaDTO : dto.getLineas()) {
	        Componente componente = componenteRepository.findById(lineaDTO.getComponenteId())
	            .orElseThrow(() -> new RuntimeException("Componente no encontrado: " + lineaDTO.getComponenteId()));

	        PedidoComponente pc = new PedidoComponente();
	        pc.setPedido(pedido);
	        pc.setComponente(componente);
	        pc.setCantidad(lineaDTO.getCantidad());

	        BigDecimal subtotal = componente.getPrecio().multiply(BigDecimal.valueOf(pc.getCantidad()));
	        total = total.add(subtotal);

	        pedidoComponenteRepository.save(pc);
	    }

	    pedido.setTotal(total);
	    List<PedidoComponente> componentes = pedidoComponenteRepository.findByPedidoId(pedido.getId());
	    pedido.setPedidoComponentes(componentes);
	    pedido = pedidoRepository.save(pedido);
	    return convertirAPedidoResponseDTO(pedido);
	}


	public PedidoResponseDTO convertirAPedidoResponseDTO(Pedido pedido) {
	    PedidoResponseDTO dto = new PedidoResponseDTO();

	    dto.setId(pedido.getId());
	    dto.setNumeroPedido(pedido.getNumeroPedido());
	    dto.setUsuarioId(pedido.getUsuario().getId());
	    dto.setFecha(pedido.getFecha());
	    dto.setEstado(pedido.getEstado().name());
	    dto.setTotal(pedido.getTotal());

	    // Usuario → UsuarioFacturaDTO
	    UsuarioFacturaDTO usuarioDTO = new UsuarioFacturaDTO();
	    usuarioDTO.setNombre(pedido.getUsuario().getNombre());
	    usuarioDTO.setApellido1(pedido.getUsuario().getApellido1());
	    usuarioDTO.setApellido2(pedido.getUsuario().getApellido2());
	    usuarioDTO.setEmail(pedido.getUsuario().getEmail());
	    usuarioDTO.setTelefono(pedido.getUsuario().getTelefono()); 
	    
	    dto.setUsuario(usuarioDTO);

	    // Dirección
	    if (pedido.getDireccion() != null) {
	        DireccionDTO direccionDTO = new DireccionDTO();
	        direccionDTO.setAlias(pedido.getDireccion().getAlias());
	        direccionDTO.setCalle(pedido.getDireccion().getCalle());
	        direccionDTO.setNumero(pedido.getDireccion().getNumero());
	        direccionDTO.setPiso(pedido.getDireccion().getPiso());
	        direccionDTO.setCiudad(pedido.getDireccion().getCiudad());
	        direccionDTO.setProvincia(pedido.getDireccion().getProvincia());
	        direccionDTO.setCodigoPostal(pedido.getDireccion().getCodigoPostal());
	        direccionDTO.setPais(pedido.getDireccion().getPais());

	        dto.setDireccion(direccionDTO);
	    }

	    // Líneas de pedido
	    List<LineaPedidoResponseDTO> lineasDTO = new ArrayList<>();

	    if (pedido.getPedidoComponentes() != null) {
	        for (PedidoComponente pc : pedido.getPedidoComponentes()) {
	            LineaPedidoResponseDTO linea = new LineaPedidoResponseDTO();
	            linea.setComponenteId(pc.getComponente().getId());
	            linea.setNombre(pc.getComponente().getNombre());
	            linea.setPrecioUnitario(pc.getComponente().getPrecio());
	            linea.setCantidad(pc.getCantidad());
	            lineasDTO.add(linea);
	        }
	    }

	    dto.setLineas(lineasDTO);
	    return dto;
	}

	public List<PedidoResumenDTO> obtenerPedidosResumenPorEmail(String email) {
	    Usuario usuario = usuarioRepository.findByEmail(email)
	        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	    List<Pedido> pedidos = pedidoRepository.findByUsuarioId(usuario.getId());

	    return pedidos.stream()
	        .map(this::convertirAPedidoResumenDTO)
	        .toList();
	}

	@Override
	public PedidoResumenDTO convertirAPedidoResumenDTO(Pedido pedido) {
	    PedidoResumenDTO dto = new PedidoResumenDTO();
	    dto.setId(pedido.getId());
	    dto.setFecha(pedido.getFecha());
	    dto.setEstado(pedido.getEstado().name());
	    dto.setTotal(pedido.getTotal());
	    dto.setDireccionAlias(pedido.getDireccion().getAlias());
	    return dto;
	}

	@Override
	public PedidoResponseDTO getPedidoDetallePorId(Long id) {
	    Pedido pedido = pedidoRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

	    pedido.setPedidoComponentes(pedidoComponenteRepository.findByPedidoId(id));

	    return convertirAPedidoResponseDTO(pedido);
	}

	@Override
	public PedidoResponseDTO crearPedidoComoEmpleado(PedidoRequestDTO dto, String emailEmpleado) {

	    Usuario cliente = usuarioRepository.findById(dto.getUsuarioId())
	        .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

	    Usuario empleado = usuarioRepository.findByEmail(emailEmpleado)
	        .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

	    Direccion direccion = null;
	    if (dto.getDireccionId() != null) {
	        direccion = direccionRepository.findById(dto.getDireccionId())
	            .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
	    }

	    Pedido pedido = new Pedido();
	    pedido.setUsuario(cliente);
	    pedido.setEmpleado(empleado);
	    pedido.setDireccion(direccion);
	    pedido.setFecha(LocalDateTime.now());
	    pedido.setEstado(Estado.PENDIENTE);
	    pedido.setTotal(BigDecimal.ZERO); // se ajustará después

	    pedido = pedidoRepository.save(pedido); // guarda primero para asociar en componentes

	    BigDecimal total = BigDecimal.ZERO;

	    for (PedidoRequestDTO.LineaPedidoDTO linea : dto.getLineas()) {
	        Componente componente = componenteRepository.findById(linea.getComponenteId())
	            .orElseThrow(() -> new RuntimeException("Componente no encontrado"));

	        PedidoComponente pc = new PedidoComponente();
	        pc.setPedido(pedido);
	        pc.setComponente(componente);
	        pc.setCantidad(linea.getCantidad());

	        BigDecimal subtotal = BigDecimal.valueOf(linea.getPrecioUnitario())
	            .multiply(BigDecimal.valueOf(linea.getCantidad()));
	        total = total.add(subtotal);

	        pedidoComponenteRepository.save(pc);
	    }

	    pedido.setTotal(total);
	    pedido = pedidoRepository.save(pedido);

	    return PedidoMapper.toDTO(pedido);
	}

	@Override
	public String generarNumeroPedido() {
	    long totalPedidos = pedidoRepository.count();
	    return String.format("PED-%04d", totalPedidos + 1);
	}

}
