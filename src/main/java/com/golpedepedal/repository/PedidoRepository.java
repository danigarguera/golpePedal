package com.golpedepedal.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golpedepedal.model.Pedido;
import com.golpedepedal.model.Usuario;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	
    List<Pedido> findByUsuarioId(Long usuarioId);

    List<Pedido> findByUsuarioAndDireccionIsNotNull(Usuario usuario);

	List<Pedido> findByEmpleadoNotNullAndFechaBetween(LocalDateTime fechaDesde, LocalDateTime fechaHasta);

}
