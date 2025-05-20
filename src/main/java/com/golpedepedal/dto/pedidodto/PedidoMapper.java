package com.golpedepedal.dto.pedidodto;

import com.golpedepedal.model.Pedido;
import com.golpedepedal.model.Usuario;
import com.golpedepedal.model.Direccion;
import com.golpedepedal.dto.DireccionDTO;
import com.golpedepedal.dto.usuariodto.UsuarioFacturaDTO;
import com.golpedepedal.model.Componente;

import java.util.List;
import java.util.stream.Collectors;

public class PedidoMapper {

    public static PedidoResponseDTO toDTO(Pedido pedido) {
        PedidoResponseDTO dto = new PedidoResponseDTO();
        dto.setId(pedido.getId());
        dto.setUsuarioId(pedido.getUsuario().getId());
        dto.setFecha(pedido.getFecha());
        dto.setEstado(pedido.getEstado().name());
        dto.setTotal(pedido.getTotal());

        // Usuario
        Usuario u = pedido.getUsuario();
        UsuarioFacturaDTO usuarioDTO = new UsuarioFacturaDTO();
        usuarioDTO.setNombre(u.getNombre());
        usuarioDTO.setApellido1(u.getApellido1());
        usuarioDTO.setApellido2(u.getApellido2());
        usuarioDTO.setEmail(u.getEmail());
        usuarioDTO.setTelefono(u.getTelefono());
        dto.setUsuario(usuarioDTO);

        // Dirección (si existe)
        if (pedido.getDireccion() != null) {
            Direccion d = pedido.getDireccion();
            DireccionDTO dirDTO = new DireccionDTO();
            dirDTO.setAlias(d.getAlias());
            dirDTO.setCalle(d.getCalle());
            dirDTO.setNumero(d.getNumero());
            dirDTO.setPiso(d.getPiso());
            dirDTO.setCiudad(d.getCiudad());
            dirDTO.setProvincia(d.getProvincia());
            dirDTO.setCodigoPostal(d.getCodigoPostal());
            dirDTO.setPais(d.getPais());
            dto.setDireccion(dirDTO);
        }

        // Líneas
        List<LineaPedidoResponseDTO> lineas = pedido.getPedidoComponentes().stream().map(pc -> {
            Componente comp = pc.getComponente();
            LineaPedidoResponseDTO l = new LineaPedidoResponseDTO();
            l.setComponenteId(comp.getId());
            l.setNombre(comp.getNombre());
            l.setCantidad(pc.getCantidad());
            l.setPrecioUnitario(comp.getPrecio());
            return l;
        }).collect(Collectors.toList());
        dto.setLineas(lineas);

        return dto;
    }
    
    public static PedidoGestionDTO toGestionDTO(Pedido pedido) {
        PedidoGestionDTO dto = new PedidoGestionDTO();
        dto.setId(pedido.getId());
        dto.setCliente(pedido.getUsuario().getNombre() + " " + pedido.getUsuario().getApellido1());

        if (pedido.getEmpleado() != null) {
            dto.setEmpleado(pedido.getEmpleado().getNombre() + " " + pedido.getEmpleado().getApellido1());
        } else {
            dto.setEmpleado("-");
        }

        dto.setEstado(pedido.getEstado().name());
        dto.setFecha(pedido.getFecha().toString()); 
        dto.setTotal(pedido.getTotal());

        return dto;
    }

}
