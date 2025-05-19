package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.dto.ComponenteDTO;
import com.golpedepedal.model.Componente;

public interface ComponenteService {

    List<Componente> obtenerTodos();
    
    Componente guardar(Componente componente);
    
    Optional<Componente> buscarPorId(Long id);
    
    void eliminar(Long id);
    
    List<Componente> buscarPorMarcaId(Long marcaId);
    
    List<Componente> buscar(String nombre, Long tipoComponenteId, Long marcaId);
    
    Componente crearDesdeDTO(ComponenteDTO dto);

    Componente actualizarDesdeDTO(Long id, ComponenteDTO dto);



}
