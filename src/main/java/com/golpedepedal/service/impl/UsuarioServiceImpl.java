package com.golpedepedal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.golpedepedal.dto.usuariodto.UsuarioRequest;
import com.golpedepedal.model.Role;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.repository.RoleRepository;
import com.golpedepedal.repository.UsuarioRepository;
import com.golpedepedal.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService{
	
	private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;
    
    private final RoleRepository roleRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        if (usuario.getPassword() != null && !usuario.getPassword().startsWith("$2a$")) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

	@Override
	public Usuario buscarPorEmail(String email) {
		return usuarioRepository.findByEmail(email).
				orElse(null); // se puede cambiar por un elseThrow para meter una exepcion mas adelante
		}

	@Override
	public Usuario convertirDesdeDto(UsuarioRequest dto) {
	    Usuario usuario = new Usuario();
	    usuario.setNombre(dto.getNombre());
	    usuario.setApellido1(dto.getApellido1());
	    usuario.setApellido2(dto.getApellido2());
	    usuario.setDni(dto.getDni());
	    usuario.setEmail(dto.getEmail());
	    usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
	    usuario.setTelefono(dto.getTelefono());

	    Role rol = roleRepository.findById(dto.getRolId())
	    	    .orElseThrow(() -> new RuntimeException("Rol no válido"));
	    	usuario.setRol(rol);

	    return usuario;
	}

	
    
    
}
