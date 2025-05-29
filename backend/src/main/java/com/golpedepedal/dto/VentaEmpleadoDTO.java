package com.golpedepedal.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class VentaEmpleadoDTO {

	    private Long id;
	    
	    private LocalDateTime fecha;
	    
	    private String cliente;
	    
	    private String empleado;
	    
	    private BigDecimal total;
	    
	    private String numeroPedido;


		public VentaEmpleadoDTO() {
		}
		
		

		public VentaEmpleadoDTO(Long id, LocalDateTime fecha, String cliente, String empleado, BigDecimal total, String numeroPedido) {
			this.id = id;
			this.fecha = fecha;
			this.cliente = cliente;
			this.empleado = empleado;
			this.total = total;
			this.numeroPedido = numeroPedido;
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

		public String getCliente() {
			return cliente;
		}

		public void setCliente(String cliente) {
			this.cliente = cliente;
		}

		public String getEmpleado() {
			return empleado;
		}

		public void setEmpleado(String empleado) {
			this.empleado = empleado;
		}

		public BigDecimal getTotal() {
			return total;
		}

		public void setTotal(BigDecimal total) {
			this.total = total;
		}



		public String getNumeroPedido() {
			return numeroPedido;
		}



		public void setNumeroPedido(String numeroPedido) {
			this.numeroPedido = numeroPedido;
		}
	    
	    
	    
}
