package com.golpedepedal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.golpedepedal.model.Componente;
import com.golpedepedal.service.ComponenteService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/componentes")
public class ComponenteController {

    private final ComponenteService service;

    public ComponenteController(ComponenteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Componente> listar() {
        System.out.println("✅ Acceso permitido al endpoint /api/componentes");
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Componente> get(@PathVariable Long id) {
        return service.buscarPorId(id);
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
        @RequestParam(required = false) String tipo,
        @RequestParam(required = false) Long marcaId) {

        return service.buscar(nombre, tipo, marcaId);
    }


}
