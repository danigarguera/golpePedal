package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.dto.DireccionDTO;
import com.golpedepedal.model.Direccion;
import com.golpedepedal.repository.DireccionRepository;
import com.golpedepedal.service.DireccionService;

@Service
public class DireccionServiceImpl implements DireccionService {
	
    private final DireccionRepository direccionRepository;
    
    public DireccionServiceImpl(DireccionRepository direccionRepository) {
        this.direccionRepository = direccionRepository;
    }

	@Override
	public List<Direccion> obtenerTodas() {

		return direccionRepository.findAll();		
	}

	@Override
	public Direccion guardar(Direccion direccion) {
		
		return direccionRepository.save(direccion);
	}

	@Override
	public Optional<Direccion> buscarPorId(Long id) {
		
		return direccionRepository.findById(id);
	}

	@Override
	public void eliminar(Long id) {
		
		direccionRepository.deleteById(id);		
	}
    
	@Override
	public List<Direccion> buscarPorUsuarioId(Long usuarioId) {
	    return direccionRepository.findByUsuarioId(usuarioId);
	}

	@Override
	public DireccionDTO convertirADTO(Direccion direccion) {
		DireccionDTO dto = new DireccionDTO();
	    dto.setId(direccion.getId());
	    dto.setAlias(direccion.getAlias());
	    dto.setCalle(direccion.getCalle());
	    dto.setNumero(direccion.getNumero());
	    dto.setPiso(direccion.getPiso());
	    dto.setCiudad(direccion.getCiudad());
	    dto.setProvincia(direccion.getProvincia());
	    dto.setCodigoPostal(direccion.getCodigoPostal());
	    dto.setPais(direccion.getPais());
	    return dto;
	}
	


}
