package com.golpedepedal.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "componentes")
public class Componente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;

    @ManyToOne
    @JoinColumn(name = "tipo_componente_id")
    private TipoComponente tipoComponente;

    @ManyToOne
    @JoinColumn(name = "tipo_bicicleta_id")
    private TipoBicicleta tipoBicicleta;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;

    @OneToMany(mappedBy = "componente")
    private List<PedidoComponente> pedidoComponentes;

	public Componente() {
		
	}

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

	public TipoComponente getTipoComponente() {
		return tipoComponente;
	}

	public void setTipoComponente(TipoComponente tipoComponente) {
		this.tipoComponente = tipoComponente;
	}

	public TipoBicicleta getTipoBicicleta() {
		return tipoBicicleta;
	}

	public void setTipoBicicleta(TipoBicicleta tipoBicicleta) {
		this.tipoBicicleta = tipoBicicleta;
	}

	public Marca getMarca() {
		return marca;
	}

	public void setMarca(Marca marca) {
		this.marca = marca;
	}

	public List<PedidoComponente> getPedidoComponentes() {
		return pedidoComponentes;
	}

	public void setPedidoComponentes(List<PedidoComponente> pedidoComponentes) {
		this.pedidoComponentes = pedidoComponentes;
	}
    
    
}