package com.golpedepedal.dto.pedidodto;


public class PedidoComponenteDTO {

    private Long componenteId;
    private String nombre;
    private String descripcion;
    private double precio;
    private int cantidad;

    public PedidoComponenteDTO(Long componenteId, String nombre, String descripcion, double precio, int cantidad) {
        this.componenteId = componenteId;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    public Long getComponenteId() {
        return componenteId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setComponenteId(Long componenteId) {
        this.componenteId = componenteId;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}

