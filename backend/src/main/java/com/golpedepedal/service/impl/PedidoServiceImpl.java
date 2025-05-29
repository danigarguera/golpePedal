package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.model.Pedido;
import com.golpedepedal.repository.PedidoRepository;
import com.golpedepedal.service.PedidoService;

@Service
public class PedidoServiceImpl implements PedidoService {
	
    private final PedidoRepository pedidoRepository;
    
    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
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

}
