package com.golpedepedal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golpedepedal.dto.MarcaDTO;
import com.golpedepedal.dto.MarcaMapper;
import com.golpedepedal.model.Marca;
import com.golpedepedal.repository.MarcaRepository;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {

    private final MarcaRepository marcaRepository;

    public MarcaController(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    @GetMapping
    public List<MarcaDTO> listar() {
        return marcaRepository.findAll()
            .stream()
            .map(MarcaMapper::toDTO)
            .toList();
    }
}
