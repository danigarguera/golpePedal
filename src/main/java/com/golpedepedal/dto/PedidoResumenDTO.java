package com.golpedepedal.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PedidoResumenDTO {

    private Long id;
    private LocalDateTime fecha;
    private String estado;
    private BigDecimal total;
    private String direccionAlias;
    private String numeroPedido;



    public PedidoResumenDTO(Long id, String numeroPedido, LocalDateTime fecha, String estado, BigDecimal total, String direccionAlias) {
        this.id = id;
        this.numeroPedido = numeroPedido;
        this.fecha = fecha;
        this.estado = estado;
        this.total = total;
        this.direccionAlias = direccionAlias;
    }

    public PedidoResumenDTO() {
    	
    }

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getDireccionAlias() {
        return direccionAlias;
    }

    public void setDireccionAlias(String direccionAlias) {
        this.direccionAlias = direccionAlias;
    }

	public String getNumeroPedido() {
		return numeroPedido;
	}

	public void setNumeroPedido(String numeroPedido) {
		this.numeroPedido = numeroPedido;
	}
    
    
}
