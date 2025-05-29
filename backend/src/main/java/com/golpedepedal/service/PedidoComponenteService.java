package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.model.PedidoComponente;

public interface PedidoComponenteService {

    List<PedidoComponente> obtenerTodos();
    
    PedidoComponente guardar(PedidoComponente pedidoComponente);
    
    Optional<PedidoComponente> buscarPorId(Long id);
    
    void eliminar(Long id);
    
    List<PedidoComponente> obtenerPorPedidoId(Long pedidoId);


}
