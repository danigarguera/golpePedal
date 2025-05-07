package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.model.Direccion;

public interface DireccionService {

	List<Direccion> obtenerTodas();
	
    Direccion guardar(Direccion direccion);
    
    Optional<Direccion> buscarPorId(Long id);
    
    void eliminar(Long id);
    
    List<Direccion> buscarPorUsuarioId(Long usuarioId);

}
