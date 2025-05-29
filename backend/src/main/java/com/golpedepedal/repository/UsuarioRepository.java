package com.golpedepedal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.golpedepedal.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>  {

    Optional<Usuario> findByEmail(String email);
	
	@Query("SELECT u FROM Usuario u WHERE u.rol.nombre IN :roles")
	List<Usuario> findByRolNombreIn(@Param("roles") List<String> roles);


}
