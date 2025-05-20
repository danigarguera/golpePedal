package com.golpedepedal.dto.componentesdto;

import com.golpedepedal.model.Componente;
import com.golpedepedal.model.Marca;
import com.golpedepedal.model.TipoBicicleta;
import com.golpedepedal.model.TipoComponente;

public class ComponenteMapper {

	public static ComponenteDTO toDTO(Componente c) {
	    ComponenteDTO dto = new ComponenteDTO();
	    dto.setId(c.getId());
	    dto.setNombre(c.getNombre());
	    dto.setDescripcion(c.getDescripcion());
	    dto.setPrecio(c.getPrecio());

	    if (c.getTipoComponente() != null) {
	        dto.setTipo(c.getTipoComponente().getNombre());
	        dto.setTipoComponenteId(c.getTipoComponente().getId());
	    }

	    if (c.getMarca() != null) {
	        dto.setMarca(c.getMarca().getNombre());
	        dto.setMarcaId(c.getMarca().getId());
	    }

	    if (c.getTipoBicicleta() != null) {
	        dto.setTipoBicicleta(c.getTipoBicicleta().getNombre());
	        dto.setTipoBicicletaId(c.getTipoBicicleta().getId());
	    }

	    return dto;
	}



    
    public static Componente fromDTO(
            ComponenteDTO dto,
            TipoComponente tipoComponente,
            Marca marca,
            TipoBicicleta tipoBicicleta
    ) {
        Componente c = new Componente();
        c.setId(dto.getId());
        c.setNombre(dto.getNombre());
        c.setDescripcion(dto.getDescripcion());
        c.setPrecio(dto.getPrecio());
        c.setTipoComponente(tipoComponente);
        c.setMarca(marca);
        c.setTipoBicicleta(tipoBicicleta);
        return c;
    }

}
