package com.golpedepedal.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.CambioRolRequest;
import com.golpedepedal.dto.UsuarioDTO;
import com.golpedepedal.dto.UsuarioRequest;
import com.golpedepedal.model.Role;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.RoleRepository;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioService usuarioService, RoleRepository roleRepository, PasswordEncoder passwordEncoder, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
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

        String email = authentication.getName(); 
        Usuario usuario = usuarioService.buscarPorEmail(email);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuario);
    }
    
    @PutMapping("/{id}/rol")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cambiarRol(@PathVariable Long id, @RequestBody CambioRolRequest request) {
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorId(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String emailAutenticado = auth.getName();
        Usuario usuarioActual = usuarioService.buscarPorEmail(emailAutenticado);

        if (usuarioActual != null && usuarioActual.getId().equals(id)) {
            return ResponseEntity.badRequest().body("No puedes cambiar tu propio rol.");
        }

        String nuevoRolNombre = request.getRol();
        if (!nuevoRolNombre.equals("ROLE_CLIENTE") && !nuevoRolNombre.equals("ROLE_EMPLEADO")) {
            return ResponseEntity.badRequest().body("Rol no permitido.");
        }

        Role nuevoRol = roleRepository.findByNombre(nuevoRolNombre)
            .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Usuario usuario = usuarioOpt.get();
        usuario.setRol(nuevoRol);
        usuarioService.guardar(usuario);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/empleados")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UsuarioDTO> listarEmpleadosYAdmins() {
        return usuarioRepository.findByRolNombreIn(List.of("ROLE_EMPLEADO", "ROLE_ADMIN"))
            .stream()
            .map(u -> new UsuarioDTO(u.getId(), u.getEmail()))
            .toList();
    }


    @PutMapping("/mis-datos")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> actualizarMisDatos(@Valid @RequestBody UsuarioDTO dto, Principal principal) {
        Usuario usuario = usuarioService.buscarPorEmail(principal.getName());

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        usuario.setNombre(dto.getNombre());
        usuario.setApellido1(dto.getApellido1());
        usuario.setApellido2(dto.getApellido2());
        usuario.setDni(dto.getDni());
        usuario.setTelefono(dto.getTelefono());

        usuarioService.guardar(usuario);

        return ResponseEntity.ok(Map.of("mensaje", "Datos actualizados correctamente"));
    }


}
