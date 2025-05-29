package com.golpedepedal.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.DireccionCreateEmpleadoDTO;
import com.golpedepedal.dto.DireccionDTO;
import com.golpedepedal.model.Direccion;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.service.DireccionService;

@RestController
@RequestMapping("/api/direcciones")
public class DireccionController {

    private final DireccionService service;
    private final UsuarioRepository usuarioRepository;

    public DireccionController(DireccionService service, UsuarioRepository usuarioRepository) {
        this.service = service;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Direccion> listar(Principal principal) {
        Usuario usuario = usuarioRepository.findByEmail(principal.getName())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getRol().getNombre().equals("ROLE_ADMIN")) {
            return service.obtenerTodas();  
        } else {
            return service.buscarPorUsuarioId(usuario.getId());
        }
    }


    @GetMapping("/{id}")
    public Optional<Direccion> get(@PathVariable Long id) {
        return service.buscarPorId(id);
    }
    
    @GetMapping("/usuario/{usuarioId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
    public List<DireccionDTO> listarPorUsuarioId(@PathVariable Long usuarioId) {
        return service.buscarPorUsuarioId(usuarioId)
                     .stream()
                     .map(service::convertirADTO)
                     .toList();
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
    public Direccion actualizar(@PathVariable Long id, @RequestBody DireccionDTO dto, Principal principal) {
        Usuario usuario = usuarioRepository.findByEmail(principal.getName())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Direccion d = new Direccion();
        d.setId(id);
        d.setAlias(dto.getAlias());
        d.setCalle(dto.getCalle());
        d.setNumero(dto.getNumero());
        d.setPiso(dto.getPiso());
        d.setCiudad(dto.getCiudad());
        d.setProvincia(dto.getProvincia());
        d.setCodigoPostal(dto.getCodigoPostal());
        d.setPais(dto.getPais());
        d.setUsuario(usuario);

        return service.guardar(d);
    }

    @PostMapping("/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
    public Direccion crearComoEmpleado(@RequestBody DireccionCreateEmpleadoDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
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



    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }


}
