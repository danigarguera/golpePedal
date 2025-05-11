package com.golpedepedal.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.ComponenteDTO;
import com.golpedepedal.dto.ComponenteMapper;
import com.golpedepedal.model.Componente;
import com.golpedepedal.service.ComponenteService;

@RestController
@RequestMapping("/api/componentes")
public class ComponenteController {

    private final ComponenteService service;

    public ComponenteController(ComponenteService service) {
        this.service = service;
    }

    @GetMapping
    public List<ComponenteDTO> listar() {
        return service.obtenerTodos().stream()
            .map(ComponenteMapper::toDTO)
            .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComponenteDTO> get(@PathVariable Long id) {
        return service.buscarPorId(id)
            .map(ComponenteMapper::toDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Componente crear(@RequestBody Componente c) {
        return service.guardar(c);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Componente actualizar(@PathVariable Long id, @RequestBody Componente c) {
        c.setId(id);
        return service.guardar(c);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @GetMapping("/marca/{id}")
    public List<Componente> listarPorMarca(@PathVariable Long id) {
        return service.buscarPorMarcaId(id);
    }

    @GetMapping("/buscar")
    public List<Componente> buscarComponentes(
        @RequestParam(required = false) String nombre,
        @RequestParam(required = false) Long tipoComponenteId,
        @RequestParam(required = false) Long marcaId) {

        return service.buscar(nombre, tipoComponenteId, marcaId);
    }
}
