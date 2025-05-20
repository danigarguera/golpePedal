package com.golpedepedal.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.golpedepedal.dto.componentesdto.TipoBicicletaDTO;
import com.golpedepedal.dto.componentesdto.TipoBicicletaMapper;
import com.golpedepedal.repository.TipoBicicletaRepository;

@RestController
@RequestMapping("/api/tipos-bicicleta")
public class TipoBicicletaController {

    private final TipoBicicletaRepository tipoBicicletaRepository;

    public TipoBicicletaController(TipoBicicletaRepository tipoBicicletaRepository) {
        this.tipoBicicletaRepository = tipoBicicletaRepository;
    }

    @GetMapping
    public List<TipoBicicletaDTO> listar() {
        return tipoBicicletaRepository.findAll()
            .stream()
            .map(TipoBicicletaMapper::toDTO)
            .toList();
    }
}
