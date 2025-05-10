package com.golpedepedal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golpedepedal.model.PedidoComponente;

public interface PedidoComponenteRepository extends JpaRepository<PedidoComponente, Long> {

	List<PedidoComponente> findByPedidoId(Long pedidoId);

}
