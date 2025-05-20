package com.golpedepedal.dto.pedidodto;

import java.util.List;

public class PedidoRequestDTO {

    private Long usuarioId;
    private Long direccionId;

    private List<LineaPedidoDTO> lineas;

    // Getters y Setters
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getDireccionId() {
        return direccionId;
    }

    public void setDireccionId(Long direccionId) {
        this.direccionId = direccionId;
    }

    public List<LineaPedidoDTO> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaPedidoDTO> lineas) {
        this.lineas = lineas;
    }

    public static class LineaPedidoDTO {
        private Long componenteId;
        private int cantidad;
        private double precioUnitario;

        public Long getComponenteId() {
            return componenteId;
        }

        public void setComponenteId(Long componenteId) {
            this.componenteId = componenteId;
        }

        public int getCantidad() {
            return cantidad;
        }

        public void setCantidad(int cantidad) {
            this.cantidad = cantidad;
        }

        public double getPrecioUnitario() {
            return precioUnitario;
        }

        public void setPrecioUnitario(double precioUnitario) {
            this.precioUnitario = precioUnitario;
        }
    }
}
