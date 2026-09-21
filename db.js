/* ========================================================
   EL MISTERIO MAYA - API
   CONEXIÓN A AZURE SQL
   ========================================================

   Todas las funciones (registro.js, login.js, etc.)
   importan getPool() de aquí en vez de abrir su propia
   conexión. Así solo se abre una vez y se reutiliza
   (connection pooling), en lugar de abrir y cerrar una
   conexión nueva en cada petición.

   Las credenciales NUNCA van escritas aquí. Salen de
   las variables de entorno (local.settings.json en tu
   máquina, o "Configuración" -> "Variables de entorno"
   en el recurso de Azure Static Web Apps cuando esté
   desplegado). Esto es justo lo que ya tenías anotado
   en la presentación de Azure SQL: "credenciales
   protegidas fuera del código público".
   ======================================================== */

const sql = require("mssql");


const config = {

    server: process.env.SQL_SERVER,

    database: process.env.SQL_DATABASE,

    user: process.env.SQL_USER,

    password: process.env.SQL_PASSWORD,

    options: {

        encrypt: true,

        trustServerCertificate: false

    }

};


let poolPromise = null;


function getPool() {

    if (
        !poolPromise
    ) {

        poolPromise =
            sql.connect(
                config
            );

    }

    return poolPromise;

}


module.exports = {
    sql,
    getPool
};
