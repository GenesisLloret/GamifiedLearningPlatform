# Gamified Learning Platform

Este proyecto es una plataforma web de aprendizaje gamificada diseñada para demostrar competencias en el desarrollo full-stack. 

A continuación se detalla el análisis de requisitos, la arquitectura y la selección de tecnologías, junto con el progreso actual y las expectativas para futuros desarrollos.

---

## 1. Análisis de Requisitos y Diseño Funcional

- **Requisitos funcionales:**
  - Registro e inicio de sesión de usuarios.
  - Gestión y administración de perfiles (roles: alumno, profesor, administrador) *(pendiente de implementación de roles avanzados)*.
  - Acceso a contenido educativo estructurado en módulos, lecciones o cursos *(en fase de prototipo, contenido estático o simulado)*.
  - Seguimiento del progreso del usuario (puntuaciones, niveles, insignias, retos completados) *(módulo de gamificación en etapa inicial)*.
  - Implementación de mecánicas de gamificación (sistema de recompensas, logros, tablas de clasificación) *(planeado para fases futuras)*.
  - Integración de APIs externas (por ejemplo, recursos educativos, videoconferencias o foros colaborativos) *(a definir en etapas posteriores)*.

- **Requisitos no funcionales:**
  - Escalabilidad y rendimiento: arquitectura modular que permita crecimiento.
  - Seguridad: protección de datos de usuario, autenticación robusta y autorización basada en roles.
  - Accesibilidad y responsive design: interfaces adaptables a diferentes dispositivos.

- **User Stories:**
  - “Como usuario, quiero inscribirme y acceder a cursos para mejorar mis habilidades.”
  - “Como usuario, quiero recibir recompensas e insignias para motivarme en mi aprendizaje.”
  - “Como administrador, quiero gestionar el contenido educativo y monitorizar el progreso de los alumnos.”

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
  - **Framework:** React (utilizando React Router para la navegación).
  - **UI/UX:** Estilos personalizados y hoja de estilos compartida para las páginas (registro, inicio de sesión, home, dashboard, listado de usuarios).
  - **Estado:** Se maneja localmente en cada componente; en fases futuras se podrá integrar Redux o Context API para estados globales complejos.
  
- **Backend:**
  - **Lenguaje y Framework:** Node.js con Express.
  - **Autenticación:** JWT para la gestión de tokens.
  - **Persistencia:** Uso de SQLite a través de la librería `better-sqlite3` para el almacenamiento persistente de usuarios.
  - **Caché/Simulación de Redis:** Uso de `redis-mock` para simular operaciones en Redis en desarrollo.
  
- **Base de Datos:**
  - Se utiliza SQLite, gestionada con `better-sqlite3`, para persistir los datos de usuarios.

---

## 4. Planificación y Estructura del Proyecto

- **Capa de Presentación (Frontend):**
  - Páginas implementadas: Home, Registro, Inicio de Sesión, Dashboard y listado de Usuarios.
  - Navegación implementada con React Router.
  
- **Capa de Negocio (Backend):**
  - Endpoints básicos implementados:
    - `/api/auth/register`: Registro de usuarios.
    - `/api/auth/login`: Inicio de sesión.
    - `/api/users`: Listado de usuarios registrados.
    - `/api/redis/keys`: Visualización de claves en Redis (simulado con redis-mock).
  - Controladores de autenticación con manejo de hash (bcryptjs) y JWT.
  
- **Capa de Datos:**
  - Persistencia mediante SQLite con `better-sqlite3`.
  
- **Ciclo de Desarrollo Actual:**
  - Implementación del MVP con funcionalidades básicas de registro, login y listado de usuarios.
  - Interfaces frontend con un diseño moderno y responsivo (utilizando estilos CSS personalizados).
  - Pruebas y validación manual a través de la interfaz web.

---

## 5. Estado Actual del Proyecto

### Backend
- **Endpoints implementados:**
  - Registro e inicio de sesión con validación y generación de JWT.
  - Persistencia de datos en SQLite.
  - Simulación de Redis mediante redis-mock para almacenar información adicional.
- **Tecnologías utilizadas:**
  - Express, bcryptjs, jsonwebtoken, better-sqlite3 y redis-mock.
- **Consideraciones:**
  - El proyecto utiliza un modelo de datos sencillo (solo usuarios), lo cual es suficiente para el prototipo actual.
  - Se eliminaron dependencias innecesarias (lowdb, nedb, redis) para mantener el proyecto limpio.

### Frontend
- **Páginas implementadas:**
  - **HomePage:** Página de bienvenida con enlaces a registro, inicio de sesión y listado de usuarios.
  - **RegisterPage:** Formulario de registro de usuarios.
  - **LoginPage:** Formulario de inicio de sesión.
  - **Dashboard:** Página de muestra para el usuario autenticado (pendiente de ampliación).
  - **UsersPage:** Listado de usuarios registrados.
- **Diseño:** Se utilizan hojas de estilo CSS personalizadas para un diseño limpio y responsivo.
- **Integración:** Se ha configurado el proxy para redirigir las peticiones al backend.

---

## 6. Próximos Pasos y Expectativas Realistas

- **Fase de Ampliación de Funcionalidades:**
  - **Roles y Perfiles:** Implementar la gestión avanzada de roles (alumno, profesor, administrador) y permisos asociados.
  - **Contenido Educativo:** Integrar módulos, lecciones y cursos reales o simulados, junto con seguimiento del progreso.
  - **Módulo de Gamificación:** Desarrollar la lógica para asignación de puntos, niveles, insignias y retos, con un posible motor de reglas.
  - **Integraciones Externas:** Conectar con APIs de videoconferencias (Zoom, Jitsi) o recursos educativos para enriquecer el contenido.
  - **Interacción en Tiempo Real:** Considerar el uso de WebSockets (Socket.IO) para notificaciones en tiempo real sobre logros o actualizaciones.

- **Mejoras en Seguridad y Escalabilidad:**
  - Fortalecer la seguridad de los endpoints y realizar pruebas de penetración.
  - Evaluar la migración a una solución de base de datos más robusta (por ejemplo, MongoDB o PostgreSQL) si se requiere escalabilidad para producción.

- **Despliegue y CI/CD:**
  - Configurar un pipeline de integración continua (por ejemplo, GitHub Actions) para pruebas y despliegue.
  - Desplegar el backend y frontend en una plataforma en la nube (Heroku, AWS, DigitalOcean).

---

## 7. Gestión y Documentación

- **Control de Versiones:** Se utiliza Git para gestionar el código y se sigue un flujo de trabajo basado en ramas para nuevas funcionalidades.
- **Documentación:**  
  - Se recomienda documentar la API usando Swagger o Postman.
  - La documentación del proyecto se actualizará conforme se implementen nuevas funcionalidades.
- **Pruebas y QA:**  
  - Se planifican pruebas unitarias y de integración para asegurar la estabilidad de la aplicación.

---

# Conclusión

El proyecto se encuentra en una fase prototipo (MVP) con funcionalidades básicas de autenticación y persistencia de datos, y una interfaz frontend sencilla pero moderna. Las expectativas a futuro incluyen la ampliación de funcionalidades de gamificación, integración de contenido educativo y mejoras en seguridad y escalabilidad para preparar la plataforma para un entorno de producción.

---

*Este README se actualizará conforme avance el desarrollo y se integren nuevas funcionalidades.*
