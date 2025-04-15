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

import com.golpedepedal.model.Direccion;
import com.golpedepedal.service.DireccionService;

@RestController
@RequestMapping("/api/direcciones")
@CrossOrigin(origins = "*")

public class DireccionController {
	
	
    private final DireccionService service;
    
    public DireccionController(DireccionService service) { 
    	this.service = service; 
    }
    
    @GetMapping 
    public List<Direccion> listar() { 
    	
    	return service.obtenerTodas(); 
    }
    
    @GetMapping("/{id}") 
    public Optional<Direccion> get(@PathVariable Long id) { 
    	return service.buscarPorId(id); 
    
    }
    
    @PostMapping 
    public Direccion crear(@RequestBody Direccion d) { 
    	
    	return service.guardar(d); 
    	
    }
    
    @PutMapping("/{id}") 
    public Direccion actualizar(@PathVariable Long id, @RequestBody Direccion d) { 
    	
    	d.setId(id); return service.guardar(d); 
    	
    }
    
    @DeleteMapping("/{id}") 
    public void eliminar(@PathVariable Long id) { 
    	
    	service.eliminar(id); 
    	
    }

}
