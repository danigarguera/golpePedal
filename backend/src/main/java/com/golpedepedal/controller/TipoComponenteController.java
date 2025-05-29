package com.golpedepedal.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.TipoComponenteDTO;
import com.golpedepedal.dto.TipoComponenteMapper;
import com.golpedepedal.repository.TipoComponenteRepository;

@RestController
@RequestMapping("/api/tipos-componente")
public class TipoComponenteController {

    private final TipoComponenteRepository tipoComponenteRepository;

    public TipoComponenteController(TipoComponenteRepository tipoComponenteRepository) {
        this.tipoComponenteRepository = tipoComponenteRepository;
    }
    
    @GetMapping
    public List<TipoComponenteDTO> listar() {
        return tipoComponenteRepository.findAll()
            .stream()
            .map(TipoComponenteMapper::toDTO)
            .toList();
    }

}
