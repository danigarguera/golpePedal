package com.golpedepedal.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String secret = "claveultrasecretademomentoparajwtspringbootgolpedepedal"; // Cambiar por algo mejor luego
    private final long expirationMillis = 86400000; // 24 horas de duuracion para el token

    private Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Long id, String email, String rol) {
        return Jwts.builder()
            .setSubject(email)
            .claim("id", id) // ⬅️ ¡Esto es lo que falta!
            .claim("rol", rol)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
            .signWith(getKey(), SignatureAlgorithm.HS256)
            .compact();
    }


    public Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token);
    }
}
