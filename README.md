# Gamified Learning Platform

Este proyecto es una plataforma web de aprendizaje gamificada diseñada para demostrar competencias en el desarrollo full-stack.

A continuación se detalla el análisis de requisitos, la arquitectura, la selección de tecnologías, el progreso actual y las expectativas para futuros desarrollos.

---

## 1. Análisis de Requisitos y Diseño Funcional

- **Requisitos funcionales:**
  - Registro e inicio de sesión de usuarios.
  - Gestión y administración de perfiles (roles: alumno, profesor, administrador) – Se han implementado funcionalidades básicas y avanzadas para la gestión de usuarios:
    - Registro de profesores y alumnos.
    - Edición de credenciales de profesores y alumnos.
    - Habilitación/bloqueo de usuarios (alumnos y profesores).
    - Asignación de alumnos a profesores (relación N:M, donde un alumno puede tener varios profesores y viceversa).
  - Acceso a contenido educativo estructurado en módulos, lecciones o cursos (contenido simulado en el prototipo).
  - Seguimiento del progreso del usuario (puntuaciones, niveles, insignias, retos completados) – Módulo de gamificación en etapa inicial.
  - Implementación de mecánicas de gamificación (recompensas, logros, tablas de clasificación) – Planeado para fases futuras.
  - Integración de APIs externas (por ejemplo, recursos educativos, videoconferencias o foros colaborativos) – A definir en etapas posteriores.

- **Requisitos no funcionales:**
  - Escalabilidad y rendimiento: arquitectura modular que permita el crecimiento.
  - Seguridad: protección de datos de usuario, autenticación robusta y autorización basada en roles.
  - Accesibilidad y responsive design: interfaces adaptables a diferentes dispositivos.

- **User Stories:**
  - “Como usuario, quiero inscribirme y acceder a cursos para mejorar mis habilidades.”
  - “Como usuario, quiero recibir recompensas e insignias para motivarme en mi aprendizaje.”
  - “Como administrador, quiero gestionar el contenido educativo y monitorizar el progreso de los alumnos.”
  - “Como administrador, quiero gestionar profesores y alumnos, y asignar tutorías para que un alumno pueda tener múltiples profesores y viceversa.”

---

## 2. Arquitectura de la Aplicación

- **Arquitectura General:**
  - Frontend y Backend desacoplados, comunicándose a través de una API REST.
  - Posible adopción futura de microservicios para separar módulos críticos (gestión de usuarios, contenido educativo, gamificación).

- **Diagrama de Arquitectura (a nivel alto):**

  ```scss
  [Cliente: Navegador / App Móvil]
           │
           ▼
  [ Frontend (SPA: React) ]
           │  (HTTP / WebSockets)
           ▼
  [ API Gateway / Backend REST API ]
           │
           ├── [ Módulo de Gestión de Usuarios ]
           │      ├─ Gestión de alumnos y profesores
           │      └─ Asignación de tutorías (relación N:M)
           ├── [ Módulo de Contenido Educativo ]
           ├── [ Módulo de Gamificación ]
           └── [ Integraciones Externas ]
           │
           ▼
  [ Base de Datos (SQL: SQLite con better-sqlite3) ]
  ```

---

## 3. Selección de Tecnologías

- **Frontend:**
  - **Framework:** React (usando React Router para la navegación).
  - **UI/UX:** Estilos personalizados y hoja de estilos compartida para páginas como Home, Registro, Login, Dashboard, Gestión de Usuarios, Gestión de Contenido, Configuración de Gamificación y Asignación de Tutorías.
  - **Estado:** Manejo local en componentes; en el futuro se podrá integrar Redux o Context API para estados globales complejos.

- **Backend:**
  - **Lenguaje y Framework:** Node.js con Express.
  - **Autenticación:** JWT para la gestión de tokens.
  - **Persistencia:** SQLite a través de la librería `better-sqlite3` para el almacenamiento de datos.
  - **Caché/Simulación de Redis:** Uso de `redis-mock` para simular operaciones de caché en desarrollo.

- **Base de Datos:**
  - Se utiliza SQLite, administrada con `better-sqlite3`, para persistir datos de usuarios y tutorías.

---

## 4. Planificación y Estructura del Proyecto

- **Capa de Presentación (Frontend):**
  - Páginas implementadas: Home, Registro, Login, Dashboard, Gestión de Usuarios, Gestión de Contenido, Configuración de Gamificación y Asignación de Tutorías.
  - Navegación implementada mediante React Router. Los botones de registro y gestión de usuarios se han movido desde la página de inicio a la vista administrativa en `/admin/users`.

- **Capa de Negocio (Backend):**
  - Endpoints implementados:
    - `/api/auth/register` y `/api/auth/login` para autenticación.
    - `/api/users` para registro y listado de usuarios.
    - `/api/superadmin` para el registro inicial del super administrador.
    - `/api/admin` para la gestión avanzada de usuarios, contenido y gamificación.
    - `/api/tutoring` para gestionar la asignación de tutorías entre profesores y alumnos (relación N:M).
    - `/api/redis/keys` para la visualización de claves en Redis (simulado).
  - Controladores de autenticación usan bcryptjs para el hashing de contraseñas y JWT para la generación de tokens.

- **Capa de Datos:**
  - Persistencia con SQLite usando `better-sqlite3`.
  - Tablas implementadas: `users` (con campos para username, password, role y status) y `tutoring` (para la relación entre profesores y alumnos).

- **Ciclo de Desarrollo Actual:**
  - Se ha implementado un MVP con registro, login, gestión básica de usuarios y contenido.
  - Se han extendido las funcionalidades administrativas para:
    - Registrar, editar y eliminar profesores y alumnos.
    - Habilitar/bloquear usuarios.
    - Asignar tutorías (relación N:M) entre profesores y alumnos.
  - Interfaces frontend con diseño responsivo y moderno mediante hojas de estilo CSS personalizadas.
  - Pruebas y validación manual mediante la interfaz web.

---

## 5. Estado Actual del Proyecto

### Backend
- **Endpoints implementados:**
  - Autenticación (registro e inicio de sesión) con generación de JWT.
  - Gestión de usuarios (registro, edición, eliminación, actualización de estado) diferenciando roles: alumno, profesor y administrador.
  - Gestión de contenido educativo (simulado).
  - Gestión de gamificación (configuración inicial).
  - Gestión de tutorías, permitiendo asignar múltiples profesores a un alumno y viceversa.
- **Tecnologías utilizadas:**
  - Express, bcryptjs, jsonwebtoken, better-sqlite3 y redis-mock.
- **Modelo de Datos:**
  - Tabla `users` con campos: id, username, password, role y status.
  - Tabla `tutoring` para relaciones N:M entre profesores y alumnos.

### Frontend
- **Páginas implementadas:**
  - **HomePage:** Página de bienvenida con enlaces a inicio de sesión y acceso administrativo.
  - **RegisterPage:** Registro de usuarios.
  - **LoginPage:** Inicio de sesión de usuarios.
  - **Dashboard:** Página de muestra para usuarios autenticados.
  - **UsersPage:** Listado de usuarios (vista pública).
  - **SuperAdminPage:** Registro del primer administrador.
  - **AdminLoginPage:** Inicio de sesión para administradores.
  - **AdminDashboardPage:** Panel principal del administrador con enlaces a secciones.
  - **AdminUsersPage:** Gestión de usuarios, incluyendo:
    - Registro de nuevos profesores y alumnos.
    - Edición de credenciales de profesores y alumnos.
    - Habilitación/bloqueo de usuarios.
  - **AdminContentPage:** Gestión de contenido educativo.
  - **AdminGamificationPage:** Configuración de parámetros de gamificación.
  - **AdminTutoringPage:** Asignación y gestión de tutorías entre profesores y alumnos.
- **Diseño e Integración:**
  - Uso de React Router para la navegación.
  - Comunicación con el backend a través de fetch y el uso de tokens almacenados en localStorage.
  - Diseño responsivo mediante hojas de estilo CSS personalizadas.

---

## 6. Próximos Pasos y Expectativas Realistas

- **Ampliación de Funcionalidades:**
  - Mejorar la gestión avanzada de roles y permisos.
  - Integrar contenido educativo real y seguimiento del progreso del usuario.
  - Desarrollar un módulo de gamificación más sofisticado con retroalimentación en tiempo real.
  - Integrar APIs externas para videoconferencias y foros colaborativos.
  - Optimizar la comunicación en tiempo real mediante WebSockets (Socket.IO).

- **Mejoras en Seguridad y Escalabilidad:**
  - Realizar pruebas de penetración y fortalecer la seguridad de los endpoints.
  - Considerar migrar a una base de datos más robusta (PostgreSQL o MongoDB) en producción.

- **Despliegue y CI/CD:**
  - Configurar un pipeline de integración continua (por ejemplo, GitHub Actions).
  - Desplegar el sistema en una plataforma en la nube (Heroku, AWS, DigitalOcean).

---

## 7. Gestión y Documentación

- **Control de Versiones:** Se utiliza Git con un flujo de trabajo basado en ramas para incorporar nuevas funcionalidades.
- **Documentación:**  
  - La API se documentará mediante Swagger o Postman.
  - Este README se actualizará conforme se avance en el desarrollo.
- **Pruebas y QA:**  
  - Se planifican pruebas unitarias y de integración para asegurar la estabilidad del sistema.

---

# Conclusión

El proyecto se encuentra en una fase MVP con funcionalidades básicas de autenticación y persistencia, y se han extendido las capacidades administrativas para gestionar usuarios (alumnos y profesores) y sus relaciones de tutorías. Se espera que, a medida que avance el desarrollo, se integren nuevos módulos (contenido educativo y gamificación avanzada) y se fortalezcan aspectos de seguridad y escalabilidad para llevar la plataforma a un entorno de producción.

*Este README se actualizará conforme avance el proyecto y se integren nuevas funcionalidades.*