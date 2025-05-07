package com.golpedepedal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golpedepedal.model.Componente;

public interface ComponenteRepository extends JpaRepository<Componente, Long>{

	List<Componente> findByMarcaId(Long marcaId);

}
