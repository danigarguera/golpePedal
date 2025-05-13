package com.golpedepedal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golpedepedal.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	
    List<Pedido> findByUsuarioId(Long usuarioId);

}
