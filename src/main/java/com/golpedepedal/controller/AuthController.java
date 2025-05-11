package com.golpedepedal.controller;

import com.golpedepedal.dto.LoginRequest;
import com.golpedepedal.dto.RegistroRequest;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.model.Role;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.repository.RoleRepository;
import com.golpedepedal.security.JwtUtil;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public String registerUser(@Valid @RequestBody RegistroRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Ya existe un usuario con ese email.";
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

        return "Usuario registrado correctamente.";
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "❌ Credenciales incorrectas."));
        }

        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol().getNombre());

        return ResponseEntity.ok(Map.of(
                "token", token
        ));
    }
}
