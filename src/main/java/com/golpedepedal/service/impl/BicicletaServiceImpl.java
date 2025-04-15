package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.golpedepedal.model.Bicicleta;
import com.golpedepedal.repository.BicicletaRepository;
import com.golpedepedal.service.BicicletaService;

@Service
public class BicicletaServiceImpl implements BicicletaService {
	
    private final BicicletaRepository bicicletaRepository;
    
    public BicicletaServiceImpl(BicicletaRepository bicicletaRepository) {
        this.bicicletaRepository = bicicletaRepository;
    }

	@Override
	public List<Bicicleta> obtenerTodas() {
		
		return bicicletaRepository.findAll();
	}

	@Override
	public Bicicleta guardar(Bicicleta bicicleta) {
		
		return bicicletaRepository.save(bicicleta);
	}

	@Override
	public Optional<Bicicleta> buscarPorId(Long id) {
		
		return bicicletaRepository.findById(id);
	}

	@Override
	public void eliminar(Long id) {
		
		bicicletaRepository.deleteById(id);
		
	}

}
