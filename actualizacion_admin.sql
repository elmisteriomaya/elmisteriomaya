/* ========================================================
   EL MISTERIO MAYA
   ACTUALIZACIÓN - ROL DE ADMINISTRADOR
   ========================================================

   Ejecutar después de actualizacion_registro.sql.

   Mueve el "es admin" de una lista fija en el frontend
   (ADMIN_USERNAMES en sesion.js) a la base de datos, que
   es donde debe vivir un permiso real.
   ======================================================== */

ALTER TABLE Jugadores
    ADD EsAdmin BIT DEFAULT 0;


/* ========================================================
   MARCAR A LOS 3 ADMINISTRADORES DEL PROYECTO

   Ejecutar esto DESPUÉS de que "maestro", "evcarrillo"
   y "rmerida" ya se hayan registrado desde registro.html
   (o insértalos a mano si aún no existen).
   ======================================================== */

UPDATE Jugadores
SET EsAdmin = 1
WHERE NombreUsuario IN ('maestro', 'evcarrillo', 'rmerida');
