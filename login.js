/* ========================================
   EL MISTERIO MAYA
   LOGIN TEMPORAL DE PRUEBAS
======================================== */


/*
    ====================================================
    LOGIN TEMPORAL
    ====================================================

    Esta versión NO utiliza:

    - Contraseña
    - Crear cuenta
    - Autenticación real

    Únicamente solicita el nombre del jugador.

    Este archivo es temporal y se utiliza para
    pruebas durante el desarrollo.
    ====================================================
*/


/* ========================================
   ELEMENTOS
======================================== */

const usernameInput =
    document.getElementById(
        "username"
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
    function () {


        /*
            Obtener nombre
        */

        const playerName =
            usernameInput.value.trim();


        /*
            Validar nombre
        */

        if (
            playerName === ""
        ) {

            message.textContent =
                "Ingresa el nombre de tu guerrero.";


            usernameInput.focus();


            return;

        }


        /*
            Guardar nombre
        */

        localStorage.setItem(
            "mayaPlayerName",
            playerName
        );


        /*
            Mensaje temporal
        */

        message.textContent =
            `Bienvenido, ${playerName}.`;


        /*
            Ir al concentimiento
        */

        setTimeout(
            function () {

                window.location.href =
                    "disclaimer.html";

            },
            400
        );

    }
);


/* ========================================
   ENTER PARA INICIAR
======================================== */

usernameInput.addEventListener(
    "keydown",
    function (
        event
    ) {

        if (
            event.key ===
            "Enter"
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