/* ========================================================
   EL MISTERIO MAYA - API
   POST /api/login
   ========================================================

   Recibe:

   {
     "nombreUsuario": "evcarrillo",
     "contrasena": "unaClaveSegura"
   }

   Reemplaza la verificación por nombre de usuario que
   hoy vive en sesion.js (ADMIN_USERNAMES). Aquí sí se
   valida la contraseña de verdad, y "esAdmin" ya no es
   una lista fija en el frontend: viene de la columna
   EsAdmin de la tabla Jugadores.
   ======================================================== */

const { app } = require("@azure/functions");
const bcrypt = require("bcryptjs");
const { sql, getPool } = require("../db");


app.http("login", {

    methods: ["POST"],

    authLevel: "anonymous",

    route: "login",

    handler: async function (request, context) {

        let body;

        try {

            body = await request.json();

        }

        catch (error) {

            return {
                status: 400,
                jsonBody: { error: "Cuerpo de la petición inválido." }
            };

        }


        const nombreUsuario =
            (body.nombreUsuario || "").trim();

        const contrasena =
            body.contrasena || "";


        if (
            nombreUsuario === "" ||
            contrasena === ""
        ) {

            return {
                status: 400,
                jsonBody: { error: "Debes ingresar usuario y contraseña." }
            };

        }


        try {

            const pool =
                await getPool();


            const result =
                await pool.request()
                    .input("nombreUsuario", sql.VarChar(50), nombreUsuario)
                    .query(`
                        SELECT
                            JugadorID,
                            NombreUsuario,
                            ContrasenaHash,
                            PuntajeMaximo,
                            ProgresoNivel,
                            EsAdmin
                        FROM Jugadores
                        WHERE NombreUsuario = @nombreUsuario
                    `);


            /*
                No decimos "el usuario no existe"
                vs. "la contraseña es incorrecta"
                por separado: dar esa pista extra
                le facilita a alguien adivinar
                qué usuarios sí existen.
            */

            if (
                result.recordset.length === 0
            ) {

                return {
                    status: 401,
                    jsonBody: { error: "Usuario o contraseña incorrectos." }
                };

            }


            const jugador =
                result.recordset[0];


            const passwordCorrecto =
                await bcrypt.compare(
                    contrasena,
                    jugador.ContrasenaHash
                );


            if (
                !passwordCorrecto
            ) {

                return {
                    status: 401,
                    jsonBody: { error: "Usuario o contraseña incorrectos." }
                };

            }


            return {
                status: 200,
                jsonBody: {
                    jugadorId: jugador.JugadorID,
                    nombreUsuario: jugador.NombreUsuario,
                    puntajeMaximo: jugador.PuntajeMaximo,
                    progresoNivel: jugador.ProgresoNivel,
                    esAdmin: !!jugador.EsAdmin
                }
            };

        }

        catch (error) {

            context.error(error);

            return {
                status: 500,
                jsonBody: { error: "Error al iniciar sesión." }
            };

        }

    }

});
