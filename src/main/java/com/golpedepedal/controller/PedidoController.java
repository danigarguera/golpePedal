package com.golpedepedal.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golpedepedal.dto.PedidoRequestDTO;
import com.golpedepedal.dto.PedidoResponseDTO;
import com.golpedepedal.dto.PedidoResumenDTO;
import com.golpedepedal.model.Pedido;
import com.golpedepedal.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    
    private final PedidoService service;
    
    public PedidoController(PedidoService service) { 
        this.service = service; 
    }
    
    @GetMapping 
    public List<Pedido> listar() {
        return service.obtenerTodos(); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponseDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPedidoDetallePorId(id));
    }

    @PutMapping("/{id}") 
    public Pedido actualizar(@PathVariable Long id, @RequestBody Pedido p) {
        p.setId(id); 
        return service.guardar(p); 
    }

    @DeleteMapping("/{id}") 
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id); 
    }

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody PedidoRequestDTO pedidoDTO) {
        try {
            PedidoResponseDTO response = service.crearPedidoDesdeDTO(pedidoDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear el pedido: " + e.getMessage());
        }
    }
    
    @GetMapping("/mios")
    public ResponseEntity<List<PedidoResumenDTO>> obtenerPedidosDelUsuario(Principal principal) {
        String email = principal.getName();
        List<PedidoResumenDTO> pedidos = service.obtenerPedidosResumenPorEmail(email);
        return ResponseEntity.ok(pedidos);
    }




}
