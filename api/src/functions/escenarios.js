/* ========================================================
   EL MISTERIO MAYA - API
   GET /api/escenarios
   ========================================================

   Reemplaza el arreglo "securityScenarios" hardcodeado
   en ads.js. Devuelve solo los escenarios con Activo = 1.
   ======================================================== */

const { app } = require("@azure/functions");
const { getPool } = require("../db");


app.http("escenarios", {

    methods: ["GET"],

    authLevel: "anonymous",

    route: "escenarios",

    handler: async function (request, context) {

        try {

            const pool =
                await getPool();


            const result =
                await pool.request()
                    .query(`
                        SELECT
                            EscenarioID,
                            TipoAtaque,
                            Dificultad,
                            Icono,
                            Titulo,
                            Mensaje,
                            TextoAccion,
                            Recomendacion
                        FROM Escenarios
                        WHERE Activo = 1
                    `);


            return {
                status: 200,
                jsonBody: result.recordset
            };

        }

        catch (error) {

            context.error(error);

            return {
                status: 500,
                jsonBody: { error: "Error al obtener los escenarios." }
            };

        }

    }

});
