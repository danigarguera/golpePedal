package com.golpedepedal.service;

import java.util.List;
import java.util.Optional;

import com.golpedepedal.model.Usuario;

public interface UsuarioService {

	 List<Usuario> obtenerTodos();
	 
	 Usuario guardar(Usuario usuario);
	    
	 Optional<Usuario> buscarPorId(Long id);
	 
	 void eliminar(Long id);
	
}
