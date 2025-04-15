package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.model.PedidoComponente;
import com.golpedepedal.repository.PedidoComponenteRepository;
import com.golpedepedal.service.PedidoComponenteService;

@Service
public class PedidoComponenteServiceImpl implements PedidoComponenteService {
	
    private final PedidoComponenteRepository pedidoComponenteRepository;
    
    public PedidoComponenteServiceImpl(PedidoComponenteRepository pedidoComponenteRepository) {
        this.pedidoComponenteRepository = pedidoComponenteRepository;
    }

	@Override
	public List<PedidoComponente> obtenerTodos() {
		
		return pedidoComponenteRepository.findAll();
	}

	@Override
	public PedidoComponente guardar(PedidoComponente pedidoComponente) {
		
		return pedidoComponenteRepository.save(pedidoComponente);
	}

	@Override
	public Optional<PedidoComponente> buscarPorId(Long id) {
		
		return pedidoComponenteRepository.findById(id);
	}

	@Override
	public void eliminar(Long id) {
		
		pedidoComponenteRepository.deleteById(id);		
	}

}
