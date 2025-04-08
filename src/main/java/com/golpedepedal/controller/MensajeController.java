package com.golpedepedal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.golpedepedal.repository.MensajeRepository;

@Controller
public class MensajeController {

    @Autowired
    private MensajeRepository mensajeRepository;

    @GetMapping("/")
    public String inicio() {
        return "index";
    }

    @GetMapping("/mensaje")
    public String mostrarMensaje(Model model) {
        String texto = mensajeRepository.findAll().get(0).getTexto();
        model.addAttribute("mensaje", texto);
        return "mensaje";
    }

}
