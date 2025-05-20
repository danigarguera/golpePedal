package com.golpedepedal.dto.componentesdto;

import com.golpedepedal.model.TipoComponente;

public class TipoComponenteMapper {
    public static TipoComponenteDTO toDTO(TipoComponente entity) {
        return new TipoComponenteDTO(entity.getId(), entity.getNombre());
    }
}
