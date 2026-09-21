/* ========================================
   EL MISTERIO MAYA
   LOGIN - CONECTADO AL API
======================================== */


/* ========================================
   ELEMENTOS
======================================== */

const usernameInput =
    document.getElementById(
        "username"
    );

const passwordInput =
    document.getElementById(
        "password"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const message =
    document.getElementById(
        "message"
    );


/* ========================================
   INICIAR PARTIDA
======================================== */

loginButton.addEventListener(
    "click",
    async function () {


        const playerName =
            usernameInput.value.trim();

        const password =
            passwordInput.value;


        /*
            Validar campos
        */

        if (
            playerName === "" ||
            password === ""
        ) {

            message.textContent =
                "Ingresa tu usuario y contraseña.";

            return;

        }


        loginButton.disabled =
            true;

        message.textContent =
            "Verificando...";


        try {

            const response =
                await fetch(
                    "/api/login",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                nombreUsuario:
                                    playerName,
                                contrasena:
                                    password
                            })
                    }
                );


            const data =
                await response.json();


            if (
                !response.ok
            ) {

                message.textContent =
                    data.error ||
                    "No se pudo iniciar sesión.";

                loginButton.disabled =
                    false;

                return;

            }


            /*
                Guardar datos de sesión.

                storage.js, ads.js y sesion.js
                leen "mayaPlayer" para saber
                quién está jugando.

                "mayaEsAdmin" reemplaza a la
                lista fija ADMIN_USERNAMES que
                tenía sesion.js: ahora el rol
                de administrador viene de la
                base de datos (columna EsAdmin),
                no de un arreglo en el código.
            */

            localStorage.setItem(
                "mayaPlayer",
                data.nombreUsuario
            );

            localStorage.setItem(
                "mayaJugadorId",
                data.jugadorId
            );

            localStorage.setItem(
                "mayaEsAdmin",
                data.esAdmin ? "true" : "false"
            );


            message.textContent =
                `Bienvenido, ${data.nombreUsuario}.`;


            setTimeout(
                function () {

                    window.location.href =
                        "disclaimer.html";

                },
                400
            );

        }

        catch (error) {

            console.error(
                error
            );

            message.textContent =
                "No se pudo conectar con el servidor. Intenta más tarde.";

            loginButton.disabled =
                false;

        }

    }
);


/* ========================================
   ENTER PARA INICIAR
======================================== */

usernameInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            passwordInput.focus();

        }

    }
);


passwordInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            loginButton.click();

        }

    }
);


/* ========================================
   AVISO DE SEGURIDAD
======================================== */

const securityNotice =
    document.getElementById("securityNotice");

const securityContinue =
    document.getElementById("securityContinue");


securityContinue.addEventListener(
    "click",
    function () {

        securityNotice.classList.add("hidden");

    }
);


/* ========================================
   CREAR CUENTA
======================================== */

const registerButton =
    document.getElementById(
        "registerButton"
    );


registerButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "registro.html";

    }
);
