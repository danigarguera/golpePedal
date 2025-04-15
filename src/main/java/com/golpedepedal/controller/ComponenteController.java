package com.golpedepedal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golpedepedal.model.Componente;
import com.golpedepedal.service.ComponenteService;

@RestController
@RequestMapping("/api/componentes")
@CrossOrigin(origins = "*")

public class ComponenteController {
	
	
    private final ComponenteService service;
    
    public ComponenteController(ComponenteService service) {
    	this.service = service; 
    }
    
    @GetMapping
    public List<Componente> listar() { 
    	
    	return service.obtenerTodos(); 
   	
    }
    @GetMapping("/{id}") 
    public Optional<Componente> get(@PathVariable Long id) { 
    	
    	return service.buscarPorId(id); 
    	
    }
    @PostMapping 
    public Componente crear(@RequestBody Componente c) { 
    	
    	return service.guardar(c); 
    	
    }
    @PutMapping("/{id}") 
    public Componente actualizar(@PathVariable Long id, @RequestBody Componente c) { 
    	
    	c.setId(id); return service.guardar(c); 
    	
    }
    @DeleteMapping("/{id}") 
    public void eliminar(@PathVariable Long id) { 
    	
    	service.eliminar(id); 
    	
    }

}
