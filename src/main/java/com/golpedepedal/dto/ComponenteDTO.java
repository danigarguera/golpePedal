package com.golpedepedal.dto;

import java.math.BigDecimal;

public class ComponenteDTO {

    private Long id;
    
    private String nombre;
    
    private String descripcion;
    
    private BigDecimal precio;
    
    private String tipo;
    
    private String marca;
    
    private Long tipoComponenteId;
    
    private Long marcaId;
    
    private Long tipoBicicletaId;
    
    private String tipoBicicleta;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public Long getTipoComponenteId() {
		return tipoComponenteId;
	}

	public void setTipoComponenteId(Long tipoComponenteId) {
		this.tipoComponenteId = tipoComponenteId;
	}

	public Long getMarcaId() {
		return marcaId;
	}

	public void setMarcaId(Long marcaId) {
		this.marcaId = marcaId;
	}

	public Long getTipoBicicletaId() {
		return tipoBicicletaId;
	}

	public void setTipoBicicletaId(Long tipoBicicletaId) {
		this.tipoBicicletaId = tipoBicicletaId;
	}

	public String getTipoBicicleta() {
		return tipoBicicleta;
	}

	public void setTipoBicicleta(String tipoBicicleta) {
		this.tipoBicicleta = tipoBicicleta;
	}
    
    
    
}
