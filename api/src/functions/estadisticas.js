/* ========================================================
   EL MISTERIO MAYA - API
   GET /api/admin/estadisticas
   ========================================================

   Reemplaza a getSecurityResults() en admin.js, que hoy
   lee "mayaSecurityResults" de localStorage (solo del
   navegador donde se abre el panel).

   Trae, ya calculado con SQL, TODO lo que necesita el
   panel de administrador:

   - totalJugadores: TODOS los jugadores registrados
     (no solo los que ya jugaron un escenario).
   - totalEscenarios / totalComprometidos: para calcular
     el % de susceptibilidad.
   - porTecnica: detectado vs. comprometido, agrupado por
     tipo de ataque.
   - interaccionesRiesgosas: TODAS las filas donde el
     jugador cayó (Resultado = 'compromised'), con el
     nombre del jugador, su país y la técnica ya resueltos
     (JOIN con Jugadores, Paises y Escenarios) - no
     solamente las más recientes.
   ======================================================== */

const { app } = require("@azure/functions");
const { getPool } = require("../db");


app.http("estadisticas", {

    methods: ["GET"],

    authLevel: "anonymous",

    route: "admin/estadisticas",

    handler: async function (request, context) {

        try {

            const pool =
                await getPool();


            /*
                Total de jugadores registrados
                (hayan jugado o no).
            */

            const jugadoresResult =
                await pool.request()
                    .query(
                        "SELECT COUNT(*) AS total FROM Jugadores"
                    );


            /*
                Total de escenarios evaluados
                y cuántos fueron "compromised".
            */

            const resumenResult =
                await pool.request()
                    .query(`
                        SELECT
                            COUNT(*) AS total,
                            SUM(
                                CASE WHEN Resultado = 'compromised'
                                THEN 1 ELSE 0 END
                            ) AS comprometidos
                        FROM ResultadosEscenarios
                    `);


            /*
                Detectado vs. comprometido,
                agrupado por técnica de ataque.
            */

            const porTecnicaResult =
                await pool.request()
                    .query(`
                        SELECT
                            e.TipoAtaque,
                            SUM(
                                CASE WHEN r.Resultado = 'detected'
                                THEN 1 ELSE 0 END
                            ) AS Detectado,
                            SUM(
                                CASE WHEN r.Resultado = 'compromised'
                                THEN 1 ELSE 0 END
                            ) AS Comprometido
                        FROM ResultadosEscenarios r
                        JOIN Escenarios e
                            ON r.EscenarioID = e.EscenarioID
                        GROUP BY e.TipoAtaque
                    `);


            /*
                TODAS las interacciones riesgosas
                (no solo las más recientes), con
                nombre del jugador, país y técnica
                ya resueltos por los JOIN.
            */

            const interaccionesResult =
                await pool.request()
                    .query(`
                        SELECT TOP 500
                            j.NombreUsuario AS Jugador,
                            r.FechaRegistro AS Fecha,
                            ISNULL(p.NombrePais, 'No especificada') AS Ubicacion,
                            e.TipoAtaque AS Tecnica,
                            r.NivelJuego AS Nivel
                        FROM ResultadosEscenarios r
                        JOIN Jugadores j
                            ON r.JugadorID = j.JugadorID
                        JOIN Escenarios e
                            ON r.EscenarioID = e.EscenarioID
                        LEFT JOIN Paises p
                            ON j.PaisID = p.PaisID
                        WHERE r.Resultado = 'compromised'
                        ORDER BY r.FechaRegistro DESC
                    `);


            return {

                status: 200,

                jsonBody: {

                    totalJugadores:
                        jugadoresResult.recordset[0].total,

                    totalEscenarios:
                        resumenResult.recordset[0].total,

                    totalComprometidos:
                        resumenResult.recordset[0].comprometidos || 0,

                    porTecnica:
                        porTecnicaResult.recordset,

                    interaccionesRiesgosas:
                        interaccionesResult.recordset

                }

            };

        }

        catch (error) {

            context.error(error);

            return {
                status: 500,
                jsonBody: { error: "Error al obtener las estadísticas." }
            };

        }

    }

});
