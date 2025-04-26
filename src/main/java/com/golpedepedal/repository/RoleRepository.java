package com.golpedepedal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golpedepedal.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
   
	Optional<Role> findByNombre(String nombre);

}
