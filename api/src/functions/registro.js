/* ========================================================
   EL MISTERIO MAYA - API
   POST /api/registro
   ========================================================

   Reemplaza a registro.js del frontend guardando en
   localStorage. Recibe:

   {
     "nombreUsuario": "evcarrillo",
     "contrasena": "unaClaveSegura",
     "edad": 22,
     "paisId": 47
   }

   Hace lo mismo que ya validaba registro.js (usuario no
   vacío ni repetido, contraseña de al menos 6 caracteres),
   pero del lado del servidor, que es donde SÍ importa que
   se valide de verdad: nadie puede saltarse esto editando
   el HTML o el JavaScript del navegador.

   La contraseña se convierte en un hash con bcrypt antes
   de guardarla. Un hash no se puede "desconvertir" de
   vuelta a la contraseña original; en el login, en vez de
   comparar textos, se le pide a bcrypt que compare la
   contraseña ingresada contra el hash guardado.
   ======================================================== */

const { app } = require("@azure/functions");
const bcrypt = require("bcryptjs");
const { sql, getPool } = require("../db");


app.http("registro", {

    methods: ["POST"],

    authLevel: "anonymous",

    route: "registro",

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

        const edad =
            parseInt(body.edad);

        const paisId =
            parseInt(body.paisId);


        /*
            Validaciones básicas,
            igual que en registro.js.
        */

        if (
            nombreUsuario === "" ||
            contrasena === "" ||
            isNaN(edad) ||
            isNaN(paisId)
        ) {

            return {
                status: 400,
                jsonBody: { error: "Faltan datos obligatorios." }
            };

        }


        if (
            contrasena.length < 6
        ) {

            return {
                status: 400,
                jsonBody: { error: "La contraseña debe tener al menos 6 caracteres." }
            };

        }


        if (
            edad < 1 || edad > 120
        ) {

            return {
                status: 400,
                jsonBody: { error: "Ingresa una edad válida." }
            };

        }


        try {

            const pool =
                await getPool();


            /*
                Verificar que el usuario
                no exista ya.
            */

            const existing =
                await pool.request()
                    .input("nombreUsuario", sql.VarChar(50), nombreUsuario)
                    .query(
                        "SELECT JugadorID FROM Jugadores WHERE NombreUsuario = @nombreUsuario"
                    );


            if (
                existing.recordset.length > 0
            ) {

                return {
                    status: 409,
                    jsonBody: { error: "Ese usuario ya existe." }
                };

            }


            /*
                Convertir la contraseña
                en un hash. El "10" es el
                costo del algoritmo: entre
                más alto, más lento (y más
                difícil de romper por fuerza
                bruta). 10 es un valor
                estándar razonable.
            */

            const contrasenaHash =
                await bcrypt.hash(
                    contrasena,
                    10
                );


            const result =
                await pool.request()
                    .input("nombreUsuario", sql.VarChar(50), nombreUsuario)
                    .input("contrasenaHash", sql.VarChar(255), contrasenaHash)
                    .input("edad", sql.Int, edad)
                    .input("paisId", sql.Int, paisId)
                    .query(`
                        INSERT INTO Jugadores
                            (NombreUsuario, ContrasenaHash, Edad, PaisID)
                        OUTPUT INSERTED.JugadorID
                        VALUES
                            (@nombreUsuario, @contrasenaHash, @edad, @paisId)
                    `);


            const jugadorId =
                result.recordset[0].JugadorID;


            return {
                status: 201,
                jsonBody: {
                    jugadorId: jugadorId,
                    nombreUsuario: nombreUsuario
                }
            };

        }

        catch (error) {

            context.error(error);

            return {
                status: 500,
                jsonBody: { error: "Error al crear la cuenta." }
            };

        }

    }

});
