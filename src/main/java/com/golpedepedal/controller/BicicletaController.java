package com.golpedepedal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golpedepedal.model.Bicicleta;
import com.golpedepedal.service.BicicletaService;

@RestController
@RequestMapping("/api/bicicletas")

public class BicicletaController {
	
	
    private final BicicletaService service;
    
    public BicicletaController(BicicletaService service) { 
    	this.service = service; 
    }
    
    
    @GetMapping 
    public List<Bicicleta> listar() { 
    	
    	return service.obtenerTodas(); 
    	
    }
    @GetMapping("/{id}")
    public Optional<Bicicleta> get(@PathVariable Long id) { 
    	
    	return service.buscarPorId(id); 
    	
    }
    @PostMapping 
    public Bicicleta crear(@RequestBody Bicicleta b) { 
    	
    	return service.guardar(b); 
    	
    }
    @PutMapping("/{id}") 
    public Bicicleta actualizar(@PathVariable Long id, @RequestBody Bicicleta b) { 
    	
    	b.setId(id); return service.guardar(b); 
    	
    }
    @DeleteMapping("/{id}") 
    public void eliminar(@PathVariable Long id) { 
    	
    	service.eliminar(id); 
    	
    }
}
