/* ========================================================
   EL MISTERIO MAYA
   ACTUALIZACIÓN - REGISTRO DE USUARIO
   ========================================================

   Ejecutar DESPUÉS de esquema_base_datos.sql.

   Agrega:

   1) Tabla Paises          -> catálogo para el <select>
                               de país en el registro.
   2) Columna Edad          -> en Jugadores.
   3) Columna PaisID        -> en Jugadores (llave foránea
                               hacia Paises). Reemplaza a
                               la columna Ubicacion, que
                               era texto libre.
   ======================================================== */


/* ========================================================
   TABLA: PAISES
   ======================================================== */

CREATE TABLE Paises (

    PaisID      INT IDENTITY(1,1) PRIMARY KEY,

    NombrePais  VARCHAR(60) NOT NULL UNIQUE

);


/* ========================================================
   ACTUALIZAR TABLA JUGADORES
   ======================================================== */

ALTER TABLE Jugadores
    ADD Edad INT NULL;


ALTER TABLE Jugadores
    ADD PaisID INT NULL;


ALTER TABLE Jugadores
    ADD CONSTRAINT FK_Jugadores_Pais
        FOREIGN KEY (PaisID)
        REFERENCES Paises(PaisID);


/* ========================================================
   COLUMNA ANTIGUA "Ubicacion"

   Ya no se usa: la reemplaza PaisID.

   La dejamos por ahora sin borrar, por si ya tienes
   registros de prueba guardados ahí. Cuando confirmes
   que el registro nuevo funciona bien, puedes correr
   esta línea para eliminarla:

   ALTER TABLE Jugadores DROP COLUMN Ubicacion;
   ======================================================== */
