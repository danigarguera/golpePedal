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

import com.golpedepedal.model.Pedido;
import com.golpedepedal.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
	
	
    private final PedidoService service;
    
    public PedidoController(PedidoService service) { 
    	this.service = service; 
    }
    
    @GetMapping public List<Pedido> listar() { 
    	
    	return service.obtenerTodos(); 
    	
    }
    @GetMapping("/{id}") public Optional<Pedido> get(@PathVariable Long id) { 
    	
    	return service.buscarPorId(id); 
    	
    }
    @PostMapping public Pedido crear(@RequestBody Pedido p) { 
    	
    	return service.guardar(p); 
    	
    }
    @PutMapping("/{id}") public Pedido actualizar(@PathVariable Long id, @RequestBody Pedido p) { 
    	
    	p.setId(id); return service.guardar(p); 
    	
    }
    @DeleteMapping("/{id}") public void eliminar(@PathVariable Long id) { 
    	
    	service.eliminar(id); 
    	
    }
}
