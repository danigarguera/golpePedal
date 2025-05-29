package com.golpedepedal.dto;

import com.golpedepedal.model.Marca;

public class MarcaMapper {
    public static MarcaDTO toDTO(Marca entity) {
        return new MarcaDTO(entity.getId(), entity.getNombre());
    }
}
