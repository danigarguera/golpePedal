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

import com.golpedepedal.dto.pedidodto.PedidoComponenteDTO;
import com.golpedepedal.model.PedidoComponente;
import com.golpedepedal.service.PedidoComponenteService;

@RestController
@RequestMapping("/api/pedido-componentes")

public class PedidoComponenteController {
	
	
    private final PedidoComponenteService service;
    
    public PedidoComponenteController(PedidoComponenteService service) { 
    	this.service = service; 
    }
    
    @GetMapping 
    public List<PedidoComponente> listar() { 
    	
    	return service.obtenerTodos(); 
    	
    }
    @GetMapping("/{id}") 
    public Optional<PedidoComponente> get(@PathVariable Long id) { 
    	
    	return service.buscarPorId(id); 
    	
    }
    @PostMapping 
    public PedidoComponente crear(@RequestBody PedidoComponente pc) { 
    	
    	return service.guardar(pc); 
    	
    }
    @PutMapping("/{id}") 
    public PedidoComponente actualizar(@PathVariable Long id, @RequestBody PedidoComponente pc) { 
    	
    	pc.setId(id); return service.guardar(pc); 
    	
    }
    @DeleteMapping("/{id}") public void eliminar(@PathVariable Long id) { 
    	
    	service.eliminar(id); 
    	
    }
    @GetMapping("/pedido/{pedidoId}")
    public List<PedidoComponenteDTO> obtenerComponentesPorPedido(@PathVariable Long pedidoId) {
        return service.obtenerPorPedidoId(pedidoId).stream()
            .map(pc -> new PedidoComponenteDTO(
                pc.getComponente().getId(),
                pc.getComponente().getNombre(),
                pc.getComponente().getDescripcion(),
                pc.getComponente().getPrecio().doubleValue(),
                pc.getCantidad()
            ))
            .toList();
    }

}
