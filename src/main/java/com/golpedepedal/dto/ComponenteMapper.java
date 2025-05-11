package com.golpedepedal.dto;

import com.golpedepedal.model.Componente;

public class ComponenteMapper {

    public static ComponenteDTO toDTO(Componente c) {
        ComponenteDTO dto = new ComponenteDTO();
        dto.setId(c.getId());
        dto.setNombre(c.getNombre());
        dto.setDescripcion(c.getDescripcion());
        dto.setPrecio(c.getPrecio());

        if (c.getTipoComponente() != null) {
            dto.setTipo(c.getTipoComponente().getNombre());
        }

        if (c.getMarca() != null) {
            dto.setMarca(c.getMarca().getNombre());
        }

        return dto;
    }
}
