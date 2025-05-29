package com.golpedepedal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golpedepedal.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
