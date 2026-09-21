/* ========================================================
   EL MISTERIO MAYA - API
   GET /api/paises
   ========================================================

   Reemplaza la lista de <option> escrita a mano en
   registro.html. El frontend llama a este endpoint y
   construye el <select> con lo que devuelva.

   No necesita nada en el body: es un simple GET.
   ======================================================== */

const { app } = require("@azure/functions");
const { getPool } = require("../db");


app.http("paises", {

    methods: ["GET"],

    authLevel: "anonymous",

    route: "paises",

    handler: async function (request, context) {

        try {

            const pool =
                await getPool();


            const result =
                await pool.request()
                    .query(
                        "SELECT PaisID, NombrePais FROM Paises ORDER BY NombrePais"
                    );


            return {
                status: 200,
                jsonBody: result.recordset
            };

        }

        catch (error) {

            context.error(error);

            return {
                status: 500,
                jsonBody: { error: "Error al obtener los países." }
            };

        }

    }

});
