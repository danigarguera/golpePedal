package com.golpedepedal.model;

import jakarta.persistence.*;

@Entity
public class Mensaje {

	@Id
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String texto;
	
	public Mensaje() {
		
	}

    public Mensaje(String texto) {
        this.texto = texto;
    }
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}
	
}
