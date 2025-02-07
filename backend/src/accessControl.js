// backend/src/accessControl.js
const AccessControl = require('accesscontrol');

const ac = new AccessControl();

// Definición de los roles y permisos
exports.grantAccess = () => {
  ac.grant('alumno')
    .readOwn('profile') // Puede leer su propio perfil
    .updateOwn('profile'); // Puede actualizar su propio perfil

  ac.grant('profesor')
    .extend('alumno') // Hereda los permisos de alumno
    .readAny('course') // Puede leer cualquier curso
    .createOwn('lesson') // Puede crear sus propias lecciones
    .updateOwn('lesson') // Puede actualizar sus propias lecciones
    .deleteOwn('lesson'); // Puede eliminar sus propias lecciones

  ac.grant('admin')
    .extend('profesor') // Hereda los permisos de profesor
    .readAny('profile') // Puede leer cualquier perfil
    .updateAny('profile') // Puede actualizar cualquier perfil
    .createAny('course') // Puede crear cualquier curso
    .updateAny('course') // Puede actualizar cualquier curso
    .deleteAny('course') // Puede eliminar cualquier curso
    .createAny('lesson') // Puede crear cualquier lección
    .updateAny('lesson') // Puede actualizar cualquier lección
    .deleteAny('lesson') // Puede eliminar cualquier lección
    .createAny('user')    // Puede crear cualquier usuario
    .updateAny('user')    // Puede actualizar cualquier usuario
    .deleteAny('user');    // Puede eliminar cualquier usuario

  return ac;
};

exports.ac = ac; // Exporta la instancia de AccessControl