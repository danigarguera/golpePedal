package com.golpedepedal.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.DireccionDTO;
import com.golpedepedal.model.Direccion;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.service.DireccionService;

@RestController
@RequestMapping("/api/direcciones")
@CrossOrigin(origins = "*")
public class DireccionController {

    private final DireccionService service;
    private final UsuarioRepository usuarioRepository;

    public DireccionController(DireccionService service, UsuarioRepository usuarioRepository) {
        this.service = service;
        this.usuarioRepository = usuarioRepository;
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
    public Direccion crear(@RequestBody DireccionDTO dto, Principal principal) {
        Usuario usuario = usuarioRepository.findByEmail(principal.getName())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Direccion direccion = new Direccion();
        direccion.setAlias(dto.getAlias());
        direccion.setCalle(dto.getCalle());
        direccion.setNumero(dto.getNumero());
        direccion.setPiso(dto.getPiso());
        direccion.setCiudad(dto.getCiudad());
        direccion.setProvincia(dto.getProvincia());
        direccion.setCodigoPostal(dto.getCodigoPostal());
        direccion.setPais(dto.getPais());
        direccion.setUsuario(usuario);

        return service.guardar(direccion);
    }


    @PutMapping("/{id}")
    public Direccion actualizar(@PathVariable Long id, @RequestBody Direccion d) {
        d.setId(id);
        return service.guardar(d);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
