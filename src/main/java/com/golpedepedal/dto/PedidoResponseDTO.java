package com.golpedepedal.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponseDTO {

    private Long id;
    private Long usuarioId;
    private LocalDateTime fecha;
    private String estado;
    private BigDecimal total;
    private List<LineaPedidoResponseDTO> lineas;
    private DireccionDTO direccion;
    private UsuarioFacturaDTO usuario;


    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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

    public List<LineaPedidoResponseDTO> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaPedidoResponseDTO> lineas) {
        this.lineas = lineas;
    }

	public DireccionDTO getDireccion() {
		return direccion;
	}

	public void setDireccion(DireccionDTO direccion) {
		this.direccion = direccion;
	}

	public UsuarioFacturaDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioFacturaDTO usuario) {
		this.usuario = usuario;
	}
    
    
}
