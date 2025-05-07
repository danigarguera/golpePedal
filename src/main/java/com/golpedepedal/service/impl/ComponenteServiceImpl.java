package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.model.Componente;
import com.golpedepedal.repository.ComponenteRepository;
import com.golpedepedal.service.ComponenteService;

@Service

public class ComponenteServiceImpl implements ComponenteService {
	
    private final ComponenteRepository componenteRepository;
    
    public ComponenteServiceImpl(ComponenteRepository componenteRepository) {
        this.componenteRepository = componenteRepository;
    }

	@Override
	public List<Componente> obtenerTodos() {
		
		return componenteRepository.findAll();
	}

	@Override
	public Componente guardar(Componente componente) {
		
		return componenteRepository.save(componente);
	}

	@Override
	public Optional<Componente> buscarPorId(Long id) {
		
		return componenteRepository.findById(id);
	}

	@Override
	public void eliminar(Long id) {
		
		componenteRepository.deleteById(id);		
	}

	@Override
	public List<Componente> buscarPorMarcaId(Long marcaId) {
	    return componenteRepository.findByMarcaId(marcaId);
	}

	@Override
	public List<Componente> buscar(String nombre, Long tipoComponenteId, Long marcaId) {
	    return componenteRepository.buscar(nombre, tipoComponenteId, marcaId);
	}


}
