package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.model.Pedido;

public interface PedidoService {

	List<Pedido> obtenerTodos();
	
    Pedido guardar(Pedido pedido);
    
    Optional<Pedido> buscarPorId(Long id);
    
    void eliminar(Long id);
}
