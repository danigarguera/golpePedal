package com.golpedepedal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.UsuarioRequest;
import com.golpedepedal.model.Role;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.RoleRepository;
import com.golpedepedal.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioService usuarioService, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Usuario> listarTodos() {
        return usuarioService.obtenerTodos();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Usuario> crear(@Valid @RequestBody UsuarioRequest request) {
        Usuario usuario = usuarioService.convertirDesdeDto(request);
        Usuario guardado = usuarioService.guardar(usuario);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioRequest request) {
        Usuario usuarioExistente = usuarioService.buscarPorId(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuarioExistente.setNombre(request.getNombre());
        usuarioExistente.setApellido1(request.getApellido1());
        usuarioExistente.setApellido2(request.getApellido2());
        usuarioExistente.setDni(request.getDni());
        usuarioExistente.setEmail(request.getEmail());
        usuarioExistente.setTelefono(request.getTelefono());
        usuarioExistente.setPassword(passwordEncoder.encode(request.getPassword()));

        Role rol = roleRepository.findById(request.getRolId())
            .orElseThrow(() -> new RuntimeException("Rol no válido"));
        System.out.println("ID del rol asignado: " + rol.getId());

        usuarioExistente.setRol(rol);

        Usuario actualizado = usuarioService.guardar(usuarioExistente);
        return ResponseEntity.ok(actualizado);
    }



    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Usuario> getDatosPropios() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = authentication.getName(); // Aquí está el username/email del token
        Usuario usuario = usuarioService.buscarPorEmail(email);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuario);
    }

}
