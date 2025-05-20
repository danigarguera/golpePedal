package com.golpedepedal.controller;

import com.golpedepedal.dto.RegistroRequest;
import com.golpedepedal.dto.usuariodto.LoginRequest;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.model.Role;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.repository.RoleRepository;
import com.golpedepedal.security.JwtUtil;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioRepository usuarioRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistroRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("error", "Ya existe un usuario con ese email."));
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido1(request.getApellido1());
        usuario.setApellido2(request.getApellido2());
        usuario.setDni(request.getDni());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setTelefono(request.getTelefono());

        Role clienteRole = roleRepository.findByNombre("ROLE_CLIENTE")
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));

        usuario.setRol(clienteRole);
        usuarioRepository.save(usuario);

        // 🔐 Generar token tras registro
        String token = jwtUtil.generateToken(
        		usuario.getId(),
        	    usuario.getEmail(),
        	    usuario.getRol().getNombre()
        	);

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("token", token);
        respuesta.put("rol", usuario.getRol().getNombre());
        respuesta.put("email", usuario.getEmail());

        return ResponseEntity.ok(respuesta);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "❌ Credenciales incorrectas."));
        }

        String token = jwtUtil.generateToken(
        	    usuario.getId(),
        	    usuario.getEmail(),
        	    usuario.getRol().getNombre()
        	);


        return ResponseEntity.ok(Map.of(
                "token", token
        ));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> obtenerUsuarioAutenticado(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }

        String email = authentication.getName(); // viene del subject del token
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Map<String, Object> datos = new HashMap<>();
        datos.put("id", usuario.getId());
        datos.put("email", usuario.getEmail());
        datos.put("rol", usuario.getRol().getNombre());

        return ResponseEntity.ok(datos);
    }

}
