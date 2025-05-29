package com.golpedepedal.dto;

import com.golpedepedal.model.TipoComponente;

public class TipoComponenteMapper {
    public static TipoComponenteDTO toDTO(TipoComponente entity) {
        return new TipoComponenteDTO(entity.getId(), entity.getNombre());
    }
}
