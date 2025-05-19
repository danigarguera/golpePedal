package com.golpedepedal.dto;

import com.golpedepedal.model.TipoBicicleta;

public class TipoBicicletaMapper {
	
	
    public static TipoBicicletaDTO toDTO(TipoBicicleta tipo) {
        TipoBicicletaDTO dto = new TipoBicicletaDTO();
        dto.setId(tipo.getId());
        dto.setNombre(tipo.getNombre());
        return dto;
    }
}
