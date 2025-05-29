package com.golpedepedal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.golpedepedal.model.Componente;

public interface ComponenteRepository extends JpaRepository<Componente, Long>{

	List<Componente> findByMarcaId(Long marcaId);

	@Query("SELECT c FROM Componente c WHERE " +
		       "(:nombre IS NULL OR LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
		       "(:tipoComponenteId IS NULL OR c.tipoComponente.id = :tipoComponenteId) AND " +
		       "(:marcaId IS NULL OR c.marca.id = :marcaId)")
		List<Componente> buscar(@Param("nombre") String nombre,
		                        @Param("tipoComponenteId") Long tipoComponenteId,
		                        @Param("marcaId") Long marcaId);


}
