/* ========================================
   EL MISTERIO MAYA
   REGISTRO - CONECTADO AL API
======================================== */


/* ========================================
   ELEMENTOS
======================================== */

const regUsername =
    document.getElementById(
        "regUsername"
    );

const regPassword =
    document.getElementById(
        "regPassword"
    );

const regConfirmPassword =
    document.getElementById(
        "regConfirmPassword"
    );

const regAge =
    document.getElementById(
        "regAge"
    );

const regCountry =
    document.getElementById(
        "regCountry"
    );

const createAccountButton =
    document.getElementById(
        "createAccountButton"
    );

const message =
    document.getElementById(
        "message"
    );


/* ========================================
   CARGAR PAÍSES DESDE EL API
======================================== */

async function loadCountries() {

    try {

        const response =
            await fetch(
                "/api/paises"
            );

        if (
            !response.ok
        ) {

            throw new Error(
                "No se pudieron cargar los países."
            );

        }

        const countries =
            await response.json();


        countries.forEach(
            function (country) {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    country.PaisID;

                option.textContent =
                    country.NombrePais;

                regCountry.appendChild(
                    option
                );

            }
        );

    }

    catch (error) {

        console.error(
            error
        );

        message.textContent =
            "No se pudo conectar con el servidor. Intenta más tarde.";

    }

}


loadCountries();


/* ========================================
   CREAR CUENTA
======================================== */

createAccountButton.addEventListener(
    "click",
    async function () {

        const username =
            regUsername.value.trim();

        const password =
            regPassword.value;

        const confirmPassword =
            regConfirmPassword.value;

        const age =
            regAge.value.trim();

        const paisId =
            regCountry.value;


        /*
            Validaciones en el frontend.

            El API vuelve a validar todo
            esto del lado del servidor;
            esta parte es solo para darle
            al jugador un mensaje rápido
            sin esperar la respuesta del
            servidor.
        */

        if (
            username === ""
        ) {

            message.textContent =
                "Elige un nombre de usuario.";

            regUsername.focus();

            return;

        }


        if (
            password.length < 6
        ) {

            message.textContent =
                "La contraseña debe tener al menos 6 caracteres.";

            regPassword.focus();

            return;

        }


        if (
            password !== confirmPassword
        ) {

            message.textContent =
                "Las contraseñas no coinciden.";

            regConfirmPassword.focus();

            return;

        }


        const ageNumber =
            parseInt(age);

        if (
            age === "" ||
            isNaN(ageNumber) ||
            ageNumber < 1 ||
            ageNumber > 120
        ) {

            message.textContent =
                "Ingresa una edad válida.";

            regAge.focus();

            return;

        }


        if (
            paisId === ""
        ) {

            message.textContent =
                "Selecciona tu país.";

            regCountry.focus();

            return;

        }


        /*
            Deshabilitar el botón mientras
            esperamos al servidor, para que
            no manden la petición dos veces.
        */

        createAccountButton.disabled =
            true;

        message.textContent =
            "Creando cuenta...";


        try {

            const response =
                await fetch(
                    "/api/registro",
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
                                    username,
                                contrasena:
                                    password,
                                edad:
                                    ageNumber,
                                paisId:
                                    parseInt(paisId)
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
                    "No se pudo crear la cuenta.";

                createAccountButton.disabled =
                    false;

                return;

            }


            /*
                Cuenta creada.

                Guardamos solo el nombre
                (no la contraseña) para
                que el resto del juego
                (storage.js, ads.js,
                sesion.js) sepa quién
                está jugando.
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
                "false"
            );


            message.textContent =
                `Cuenta creada. Bienvenido, ${data.nombreUsuario}.`;


            setTimeout(
                function () {

                    window.location.href =
                        "disclaimer.html";

                },
                500
            );

        }

        catch (error) {

            console.error(
                error
            );

            message.textContent =
                "No se pudo conectar con el servidor. Intenta más tarde.";

            createAccountButton.disabled =
                false;

        }

    }
);
