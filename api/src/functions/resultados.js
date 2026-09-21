/* ========================================================
   EL MISTERIO MAYA - API
   POST /api/resultados
   ========================================================

   Recibe:

   {
     "jugadorId": 4,
     "escenarioId": "PHISHING_01",
     "resultado": "compromised",
     "nivelJuego": 2
   }

   Reemplaza el INSERT que hoy hace saveScenarioResult()
   en ads.js sobre localStorage ("mayaSecurityResults").
   ======================================================== */

const { app } = require("@azure/functions");
const { sql, getPool } = require("../db");


app.http("resultados", {

    methods: ["POST"],

    authLevel: "anonymous",

    route: "resultados",

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


        const jugadorId =
            parseInt(body.jugadorId);

        const escenarioId =
            (body.escenarioId || "").trim();

        const resultado =
            body.resultado;

        const nivelJuego =
            body.nivelJuego === null ||
            body.nivelJuego === undefined
                ? null
                : parseInt(body.nivelJuego);


        if (
            isNaN(jugadorId) ||
            escenarioId === "" ||
            !["detected", "compromised"].includes(resultado)
        ) {

            return {
                status: 400,
                jsonBody: { error: "Datos inválidos." }
            };

        }


        try {

            const pool =
                await getPool();


            await pool.request()
                .input("jugadorId", sql.Int, jugadorId)
                .input("escenarioId", sql.VarChar(20), escenarioId)
                .input("resultado", sql.VarChar(15), resultado)
                .input("nivelJuego", sql.Int, nivelJuego)
                .query(`
                    INSERT INTO ResultadosEscenarios
                        (JugadorID, EscenarioID, Resultado, NivelJuego)
                    VALUES
                        (@jugadorId, @escenarioId, @resultado, @nivelJuego)
                `);


            return {
                status: 201,
                jsonBody: { guardado: true }
            };

        }

        catch (error) {

            context.error(error);

            return {
                status: 500,
                jsonBody: { error: "Error al guardar el resultado." }
            };

        }

    }

});
