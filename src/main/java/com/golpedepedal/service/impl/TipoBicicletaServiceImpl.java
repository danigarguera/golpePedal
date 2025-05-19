package com.golpedepedal.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.golpedepedal.dto.TipoBicicletaDTO;
import com.golpedepedal.dto.TipoBicicletaMapper;
import com.golpedepedal.repository.TipoBicicletaRepository;
import com.golpedepedal.service.TipoBicicletaService;

@Service
public class TipoBicicletaServiceImpl implements TipoBicicletaService {

    private final TipoBicicletaRepository repository;

    public TipoBicicletaServiceImpl(TipoBicicletaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<TipoBicicletaDTO> listar() {
        return repository.findAll()
                .stream()
                .map(TipoBicicletaMapper::toDTO)
                .collect(Collectors.toList());
    }
}
