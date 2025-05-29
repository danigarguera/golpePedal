package com.golpedepedal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Aquí pones la contraseña que quieres cifrar
        String rawPassword = "password123";

        // Generamos el hash
        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("Contraseña en bcrypt: " + encodedPassword);
    }
}
