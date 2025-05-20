package com.golpedepedal.dto.usuariodto;

public class UsuarioDTO {
	
    private Long id;
    
    private String email;

    public UsuarioDTO(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}
