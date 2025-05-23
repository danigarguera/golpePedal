package com.golpedepedal.controller;

import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/componentes")
@CrossOrigin(origins = "*")
public class ComponenteImagenController {

	private static final String UPLOAD_DIR = "uploads/";

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/{id}/imagen")
	public ResponseEntity<Map<String, String>> subirImagen(@PathVariable Long id,
			@RequestParam("file") MultipartFile file) {

		try {
			String uploadDir = "uploads";
			String realPath = new File(uploadDir).getAbsolutePath();

			File directorio = new File(realPath);
			if (!directorio.exists()) {
				directorio.mkdirs();
			}

			String nombreArchivo = "componente-" + id + ".jpg";
			Path ruta = Paths.get(realPath, nombreArchivo);
			file.transferTo(ruta.toFile());

			Map<String, String> respuesta = new HashMap<>();
			respuesta.put("mensaje", "Imagen subida correctamente.");

			return ResponseEntity.ok(respuesta);

		} catch (IOException e) {
			e.printStackTrace();
			Map<String, String> error = new HashMap<>();
			error.put("error", "Error al subir la imagen.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@GetMapping("/{id}/imagen")
	public ResponseEntity<Resource> obtenerImagen(@PathVariable Long id) {
		try {
			String nombreArchivo = "componente-" + id + ".jpg";
			Path ruta = Paths.get(UPLOAD_DIR + nombreArchivo);
			Resource recurso = new UrlResource(ruta.toUri());

			if (recurso.exists()) {
				HttpHeaders headers = new HttpHeaders();
				headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(ruta));
				return new ResponseEntity<>(recurso, headers, HttpStatus.OK);
			} else {
				return ResponseEntity.notFound().build();
			}

		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
