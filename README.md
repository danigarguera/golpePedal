🚴 Golpe de Pedal – Proyecto Full Stack E-commerce

Golpe de Pedal es una aplicación web desarrollada como Trabajo de Fin de Grado. Se trata de una tienda online especializada en bicicletas y componentes, construida bajo una arquitectura full stack moderna:

Frontend: Angular 17 + Vite + Bootstrap

Backend: Spring Boot 3 + MySQL + Spring Security

Base de datos: MySQL

Despliegue sugerido: Vercel (frontend) y Railway (backend)

📁 Estructura del repositorio

/frontend     → Aplicación Angular completa
/backend      → API REST en Spring Boot

🚀 Cómo ejecutar el proyecto localmente

🔹 Frontend (Angular)

cd frontend
npm install
npm run dev

Luego entra a http://localhost:5173

🔹 Backend (Spring Boot)

cd backend
./mvnw spring-boot:run

La API quedará disponible en: http://localhost:8080

🛠️ Funcionalidades implementadas

✅ Backend

Registro y login de usuarios (con BCrypt y roles)

Seguridad con Spring Security

Roles: ROLE_ADMIN, ROLE_CLIENTE

Endpoints protegidos según rol

Gestión de usuarios, autenticación y autorización

Arquitectura limpia con controladores, servicios y repositorios

✅ Frontend

Registro y login con validaciones

Guardado de sesión en localStorage

Protección de rutas por rol (guards)

Navbar dinámica según estado del usuario

Vistas para cliente y administrador

Consumo de API REST para login, registro y visualización de datos

⚙️ Tecnologías utilizadas

Capa

Tecnologías

Frontend

Angular 17, Vite, Bootstrap 5, HTML, SCSS

Backend

Java 17, Spring Boot 3.4.4, Spring Security, JPA

Base datos

MySQL

Autenticación

Basic Auth + BCrypt

IDEs

VS Code, IntelliJ IDEA

🌐 Despliegue sugerido

Frontend: Vercel

Backend + MySQL: Railway

👨‍🎓 Datos del autor

Alumno: Daniel Guillén Guerrero

Grado: Desarrollo de Aplicaciones Web

IES Ágora Cáceres

Tutor/a: Pedro Moyano





