/* ========================================
   EL MISTERIO MAYA
   CONSENTIMIENTO
======================================== */


/* ========================================
   BOTÓN ACEPTAR
======================================== */

const acceptButton =
    document.getElementById(
        "acceptButton"
    );


/* ========================================
   CONTINUAR
======================================== */

acceptButton.addEventListener(
    "click",
    function () {

        /*
            Guardamos que el jugador
            aceptó el consentimiento.
        */

        localStorage.setItem(
            "mayaConsent",
            "accepted"
        );


        /*
            Continuar al mapa.
        */

        window.location.href =
            "map.html";

    }
);