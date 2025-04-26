package com.golpedepedal.controller;

import com.golpedepedal.dto.RegistroRequest;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.model.Role;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.repository.RoleRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        usuario.setPassword(passwordEncoder.encode(request.getPassword())); // 💥 ciframos
        usuario.setTelefono(request.getTelefono());

        // Por defecto siempre se registrará como cliente
        Role clienteRole = roleRepository.findByNombre("ROLE_CLIENTE")
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));

        usuario.setRol(clienteRole);

        usuarioRepository.save(usuario);

        return "Usuario registrado correctamente.";
    }
}
