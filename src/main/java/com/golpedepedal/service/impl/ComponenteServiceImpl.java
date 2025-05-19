package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.dto.ComponenteDTO;
import com.golpedepedal.dto.ComponenteMapper;
import com.golpedepedal.model.Componente;
import com.golpedepedal.repository.ComponenteRepository;
import com.golpedepedal.repository.MarcaRepository;
import com.golpedepedal.repository.TipoBicicletaRepository;
import com.golpedepedal.repository.TipoComponenteRepository;
import com.golpedepedal.service.ComponenteService;

@Service

public class ComponenteServiceImpl implements ComponenteService {
	
    private final ComponenteRepository componenteRepository;
    private final MarcaRepository marcaRepository;
    private final TipoComponenteRepository tipoComponenteRepository;
    private final TipoBicicletaRepository tipoBicicletaRepository;
    
    public ComponenteServiceImpl(
    	    ComponenteRepository componenteRepository,
    	    MarcaRepository marcaRepository,
    	    TipoComponenteRepository tipoComponenteRepository,
    	    TipoBicicletaRepository tipoBicicletaRepository) {
    	
    	    this.componenteRepository = componenteRepository;
    	    this.marcaRepository = marcaRepository;
    	    this.tipoComponenteRepository = tipoComponenteRepository;
    	    this.tipoBicicletaRepository = tipoBicicletaRepository;
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


	@Override
	public Componente crearDesdeDTO(ComponenteDTO dto) {
	    var marca = marcaRepository.findById(dto.getMarcaId())
	        .orElseThrow(() -> new IllegalArgumentException("Marca no encontrada"));

	    var tipo = tipoComponenteRepository.findById(dto.getTipoComponenteId())
	        .orElseThrow(() -> new IllegalArgumentException("Tipo de componente no encontrado"));

	    var bici = tipoBicicletaRepository.findById(dto.getTipoBicicletaId())
	        .orElseThrow(() -> new IllegalArgumentException("Tipo de bicicleta no encontrado"));

	    Componente componente = ComponenteMapper.fromDTO(dto, tipo, marca, bici);

	    return componenteRepository.save(componente);
	}

	@Override
	public Componente actualizarDesdeDTO(Long id, ComponenteDTO dto) {
	    Componente existente = componenteRepository.findById(id)
	        .orElseThrow(() -> new IllegalArgumentException("Componente no encontrado"));

	    var marca = marcaRepository.findById(dto.getMarcaId())
	        .orElseThrow(() -> new IllegalArgumentException("Marca no encontrada"));

	    var tipo = tipoComponenteRepository.findById(dto.getTipoComponenteId())
	        .orElseThrow(() -> new IllegalArgumentException("Tipo de componente no encontrado"));

	    var bici = tipoBicicletaRepository.findById(dto.getTipoBicicletaId())
	        .orElseThrow(() -> new IllegalArgumentException("Tipo de bicicleta no encontrado"));

	    // Reutilizamos el mapper
	    Componente actualizado = ComponenteMapper.fromDTO(dto, tipo, marca, bici);
	    actualizado.setId(id); // aseguramos el ID

	    return componenteRepository.save(actualizado);
	}

}
