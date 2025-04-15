package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.model.Bicicleta;

public interface BicicletaService {

	List<Bicicleta> obtenerTodas();
	
    Bicicleta guardar(Bicicleta bicicleta);
    
    Optional<Bicicleta> buscarPorId(Long id);
    
    void eliminar(Long id);
}
