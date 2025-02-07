# Gamified Learning Platform

Este proyecto es una plataforma web de aprendizaje gamificada diseñada para demostrar competencias en el desarrollo full-stack. La aplicación está pensada para facilitar el acceso a contenido educativo, gestionar usuarios con distintos roles (alumno, profesor, administrador) y motivar el aprendizaje mediante elementos de gamificación.

Esta versión actualizada incorpora funcionalidades esenciales ya implementadas, además de mejoras en la gestión de seguridad, recuperación de contraseña y administración avanzada.

---

## 1. Análisis de Requisitos y Diseño Funcional

### Requisitos funcionales

- **Autenticación y Gestión de Usuarios:**
  - Registro e inicio de sesión con generación de tokens (JWT).
  - Recuperación y reseteo de contraseña (funcionalidades _forgot password_ y _reset password_).
  - Gestión de perfiles con roles diferenciados:
    - Registro y edición de credenciales para profesores y alumnos.
    - Habilitación/bloqueo de usuarios.
    - Asignación de tutorías (relación N:M: un alumno puede tener varios profesores y viceversa).
  - Registro inicial de superadministrador a través de una interfaz específica (_SuperAdmin_).

- **Contenido Educativo:**
  - Acceso a contenido estructurado en módulos y lecciones (contenido simulado en el prototipo).
  - Gestión administrativa del contenido educativo (creación, edición y eliminación).

- **Gamificación:**
  - Seguimiento del progreso del usuario (puntuaciones, niveles, insignias, retos completados).
  - Configuración inicial de parámetros de gamificación (puntos por lección, criterios para insignias y activación de tablas de clasificación).

- **Integraciones y Funcionalidades Adicionales:**
  - Visualización y simulación de operaciones de caché (mediante redis-mock).
  - Planes a futuro para integración de APIs externas (recursos educativos, videoconferencias, foros colaborativos) y mejoras en comunicación en tiempo real (WebSockets).

### Requisitos no funcionales

- **Escalabilidad y Rendimiento:** Arquitectura modular que permite la extensión y separación de funcionalidades críticas (posible migración a microservicios en el futuro).
- **Seguridad:** Autenticación robusta, autorización basada en roles, uso de técnicas como hashing de contraseñas (bcryptjs) y protección de endpoints mediante rate limiting y Helmet.
- **Accesibilidad y Diseño Responsivo:** Interfaces adaptables a diferentes dispositivos, desarrolladas con React y estilos CSS personalizados.

### User Stories

- “Como usuario, quiero inscribirme, iniciar sesión y recuperar mi contraseña para acceder a los cursos.”
- “Como alumno, quiero ver mi progreso y recibir recompensas que me motiven a continuar aprendiendo.”
- “Como profesor, quiero gestionar mis lecciones y asignar tutorías a mis alumnos.”
- “Como administrador, quiero administrar el contenido educativo y gestionar usuarios (incluyendo la habilitación o bloqueo de cuentas) y tutorías.”

---

## 2. Arquitectura de la Aplicación

- **Arquitectura General:**
  - **Frontend y Backend Desacoplados:** La comunicación se realiza a través de una API REST.
  - **Posible Evolución:** A futuro se considerará la adopción de microservicios para separar módulos críticos (gestión de usuarios, contenido, gamificación).

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
           │      ├─ Registro, inicio de sesión, recuperación y reseteo de contraseña
           │      └─ Gestión de perfiles (roles: alumno, profesor, admin)
           ├── [ Módulo de Contenido Educativo ]
           ├── [ Módulo de Gamificación ]
           └── [ Integraciones Externas ]
           │
           ▼
  [ Base de Datos (SQLite con better-sqlite3) ]
  ```

---

## 3. Selección de Tecnologías

### Frontend

- **Framework:** React, utilizando React Router para la navegación entre páginas.
- **Diseño y UI/UX:** Interfaces responsivas y modernas, desarrolladas con hojas de estilo CSS personalizadas.
- **Gestión de Estado:** Inicialmente manejado de forma local en los componentes, con perspectiva de integrar Redux o Context API en versiones futuras.

### Backend

- **Lenguaje y Framework:** Node.js con Express.
- **Seguridad y Autenticación:** JWT para la generación y validación de tokens; bcryptjs para el hashing de contraseñas.
- **Persistencia de Datos:** SQLite, administrado mediante la librería `better-sqlite3`.
- **Simulación de Caché:** Uso de `redis-mock` para simular operaciones de caché durante el desarrollo.
- **Otros:** Rate limiting (express-rate-limit), protección de cabeceras (Helmet) y registro de solicitudes (Morgan).

---

## 4. Planificación y Estructura del Proyecto

### Capa de Presentación (Frontend)

- **Páginas Implementadas:**
  - **Públicas:** HomePage, RegisterPage, LoginPage, ForgotPasswordPage, ResetPasswordPage.
  - **Administrativas:** SuperAdminPage, AdminLoginPage, AdminDashboardPage, AdminUsersPage, AdminContentPage, AdminGamificationPage y AdminTutoringPage.
  - **Otras:** UsersPage para visualización pública del listado de usuarios y Dashboard para usuarios autenticados.
  
- **Navegación:** Implementada mediante React Router, con rutas protegidas y redireccionamientos basados en el estado (por ejemplo, comprobación de existencia de superadministrador).

### Capa de Negocio (Backend)

- **Endpoints Implementados:**
  - **Autenticación:** `/api/auth/register` y `/api/auth/login` para registro e inicio de sesión.
  - **Gestión de Usuarios:** 
    - Endpoints para registro, listado, edición y eliminación de usuarios.
    - Endpoint para actualización del estado (habilitar/bloquear) de usuarios.
    - Gestión de usuarios a través de roles diferenciados (_alumno_, _profesor_, _admin_).
  - **Recuperación de Contraseña:** Endpoints `/api/password/forgot` y `/api/password/reset`.
  - **Registro de Super Administrador:** Endpoint `/api/superadmin/register` para la creación del primer administrador y `/api/superadmin/exist` para comprobar su existencia.
  - **Contenido Educativo:** Endpoints para crear, actualizar y eliminar contenido (simulado).
  - **Gamificación:** Endpoints para configurar parámetros (puntos, criterios de insignias, activación de tabla de clasificación).
  - **Tutorías:** Gestión de asignación de tutorías (relación N:M entre profesores y alumnos) a través del endpoint `/api/tutoring`.
  - **Caché:** Endpoint `/api/redis/keys` para la visualización de claves en la simulación de Redis.

### Capa de Datos

- **Base de Datos:** SQLite administrada con `better-sqlite3`.
- **Modelos:**
  - **Tabla `users`:** Contiene campos para id, username, password, role y status.
  - **Tabla `tutoring`:** Almacena las relaciones de tutoría entre profesores y alumnos.

---

## 5. Estado Actual del Proyecto

### Backend

- **Autenticación y Seguridad:**
  - Registro e inicio de sesión implementados con JWT.
  - Funcionalidades de recuperación y reseteo de contraseña operativas.
  - Registro inicial del superadministrador para asegurar la gestión administrativa.

- **Gestión de Usuarios y Roles:**
  - Creación, edición, eliminación y actualización del estado de usuarios (alumno, profesor, admin).
  - Middleware para verificación de tokens y permisos basado en roles (AccessControl).

- **Módulos de Contenido y Gamificación:**
  - Gestión de contenido educativo (simulado) con endpoints CRUD.
  - Configuración inicial de parámetros de gamificación (puntos, criterios para insignias, activación de tablas de clasificación).

- **Gestión de Tutorías:**
  - Asignación y eliminación de relaciones de tutoría entre profesores y alumnos (relación N:M).

- **Otras Funcionalidades:**
  - Simulación de caché con redis-mock.
  - Implementación de rate limiting, seguridad (Helmet) y logging (Morgan).

### Frontend

- **Páginas y Componentes:**
  - Interfaces completas para registro, inicio de sesión, recuperación de contraseña y reseteo.
  - Paneles administrativos para la gestión de usuarios, contenido, gamificación y tutorías.
  - Componentes reutilizables como Header, Footer y formularios con diseño responsivo.
  
- **Comunicación con el Backend:**
  - Uso de fetch para consumir la API REST, con manejo de tokens almacenados en localStorage.
  - Redireccionamientos basados en el estado (por ejemplo, comprobación de existencia de superadmin mediante _useSuperAdminRedirect_).

- **Diseño y Experiencia de Usuario:**
  - Aplicación de estilos modernos y adaptables mediante CSS personalizado.
  - Navegación fluida y estructura modular de componentes.

---

## 6. Próximos Pasos y Expectativas

- **Ampliación de Funcionalidades:**
  - Mejorar la gestión avanzada de roles y permisos.
  - Integrar contenido educativo real y seguimiento del progreso del usuario.
  - Desarrollar un módulo de gamificación más sofisticado, con retroalimentación en tiempo real.
  - Integrar APIs externas para videoconferencias, foros colaborativos y otros recursos educativos.
  - Optimizar la comunicación en tiempo real mediante la integración de WebSockets (por ejemplo, con Socket.IO).

- **Mejoras en Seguridad y Rendimiento:**
  - Realizar pruebas de penetración y fortalecer la seguridad de los endpoints.
  - Considerar migrar a una base de datos más robusta (PostgreSQL o MongoDB) para entornos de producción.
  - Implementar pruebas unitarias e integración (QA) para asegurar la estabilidad del sistema.

- **Despliegue y CI/CD:**
  - Configurar pipelines de integración continua (por ejemplo, GitHub Actions).
  - Desplegar la aplicación en plataformas de nube como Heroku, AWS o DigitalOcean.

---

## 7. Gestión y Documentación

- **Control de Versiones:**  
  Se utiliza Git con un flujo de trabajo basado en ramas para incorporar nuevas funcionalidades de forma organizada.

- **Documentación:**  
  - La API se documentará mediante Swagger o Postman.
  - Este README y la documentación interna se actualizarán conforme se avance en el desarrollo.

- **Pruebas y QA:**  
  Se planifican pruebas unitarias y de integración para asegurar la estabilidad y seguridad del sistema.

---

## Conclusión

El proyecto se encuentra en una fase MVP consolidada, en la que ya se han implementado funcionalidades clave como autenticación, recuperación de contraseña, gestión de usuarios (con roles diferenciados), contenido simulado, parámetros básicos de gamificación y asignación de tutorías. A medida que se avance, se integrarán nuevos módulos, se fortalecerán aspectos de seguridad y se optimizará la experiencia del usuario para llevar la plataforma a un entorno de producción robusto.

*Este README se actualizará conforme se integren nuevas funcionalidades y se realicen mejoras en la plataforma.*

---

## Documentación del Proyecto

La siguiente es una vista general de la estructura y archivos principales del proyecto:

### Estructura de Carpetas

```
gamified-learning-platform/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   │   └── db.js
│   │   ├── routes/
│   │   ├── redisClient.js
│   │   └── accessControl.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
└── package.json
```

### Configuraciones Relevantes

- **.env (Backend):**
  ```dotenv
  JWT_SECRET=miSecreto123
  ```

- **.gitignore:**  
  Se ignoran archivos y carpetas sensibles como `node_modules`, archivos de entorno y logs.

- **Scripts de Inicio:**  
  El script principal en el package.json del proyecto permite iniciar simultáneamente el backend y el frontend usando _concurrently_.

---

Esta versión del README refleja el estado actual del desarrollo, resaltando tanto las funcionalidades implementadas como las áreas en las que se trabajará en el futuro. Con ello se espera dar una visión completa y actualizada de la Gamified Learning Platform.

---