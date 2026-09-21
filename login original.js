const loginButton =
    document.getElementById("loginButton");

const registerButton =
    document.getElementById("registerButton");

const username =
    document.getElementById("username");

const password =
    document.getElementById("password");

const message =
    document.getElementById("message");


/* ================================
   INICIAR PARTIDA
================================ */

loginButton.addEventListener(
    "click",
    function () {

        const user =
            username.value.trim();

        const pass =
            password.value.trim();


        if (
            user === "" ||
            pass === ""
        ) {

            message.textContent =
                "Debes ingresar tu nombre y contraseña.";

            return;

        }


        /*
            Guardamos temporalmente
            el nombre del jugador.
        */

        localStorage.setItem(
            "mayaPlayer",
            user
        );


        /*
            Ir al juego.
        */

        window.location.href =
            "game.html";

    }
);


/* ================================
   CREAR CUENTA
================================ */

registerButton.addEventListener(
    "click",
    function () {

        message.textContent =
            "El sistema de cuentas estará disponible próximamente.";

    }
);