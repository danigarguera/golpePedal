package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.dto.PedidoRequestDTO;
import com.golpedepedal.dto.PedidoResponseDTO;
import com.golpedepedal.dto.PedidoResumenDTO;
import com.golpedepedal.model.Pedido;
import com.golpedepedal.model.Usuario;

public interface PedidoService {

	List<Pedido> obtenerTodos();
	
    Pedido guardar(Pedido pedido);
    
    Optional<Pedido> buscarPorId(Long id);
    
    void eliminar(Long id);
    
    PedidoResponseDTO crearPedidoDesdeDTO(PedidoRequestDTO dto);
    
    List<PedidoResumenDTO> obtenerPedidosResumenPorEmail(String email);

    PedidoResumenDTO convertirAPedidoResumenDTO(Pedido pedido);
    
    public PedidoResponseDTO getPedidoDetallePorId(Long id);
    
    PedidoResponseDTO crearPedidoComoEmpleado(PedidoRequestDTO dto, String emailEmpleado);

    List<Pedido> findByUsuarioAndDireccionIsNotNull(Usuario usuario);

}
