/* ========================================
   EL MISTERIO MAYA
   MENÚ DE USUARIO (SESIÓN)
======================================== */


/*
    ====================================================
    QUÉ HACE ESTE ARCHIVO
    ====================================================

    Se incluye en map.html, game.html y statistics.html.

    Convierte el nombre del jugador que ya se muestra
    en el encabezado (el elemento con id "playerName")
    en un botón que abre un menú pequeño con:

    - Nombre del jugador
    - "Panel de administrador" (SOLO si es admin)
    - "Cerrar sesión"

    ADMIN:

    "Ser admin" ya no depende de una lista fija aquí:
    login.js guarda "mayaEsAdmin" ("true"/"false") con
    lo que devuelve POST /api/login, que a su vez lee
    la columna EsAdmin de la tabla Jugadores. El único
    lugar donde de verdad se decide quién es admin es
    la base de datos.
    ====================================================
*/


function getSessionPlayerName() {

    return (
        localStorage.getItem(
            "mayaPlayer"
        ) || "Guerrero"
    );

}


function isAdminUser() {

    return (
        localStorage.getItem(
            "mayaEsAdmin"
        ) === "true"
    );

}


function logoutSession() {

    localStorage.removeItem(
        "mayaPlayer"
    );

    localStorage.removeItem(
        "mayaJugadorId"
    );

    localStorage.removeItem(
        "mayaEsAdmin"
    );

    window.location.href =
        "index.html";

}


/* ========================================
   ESTILOS DEL MENÚ
======================================== */

function injectSessionMenuStyles() {

    const style =
        document.createElement(
            "style"
        );

    style.textContent = `

        .session-trigger {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
            position: relative;
        }

        .session-avatar {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 1px solid #d5b95f;
            background: radial-gradient(circle, rgba(213,185,95,0.25), rgba(213,185,95,0.05));
            color: #d5b95f;
            font-size: 13px;
            font-weight: bold;
        }

        .session-menu {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            z-index: 999;
            min-width: 200px;
            padding: 10px;
            border: 1px solid rgba(213, 185, 95, 0.5);
            border-radius: 10px;
            background: linear-gradient(145deg, #2b3423, #141d13);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: none;
        }

        .session-menu.open {
            display: block;
        }

        .session-menu-name {
            padding: 6px 10px 10px;
            color: #f1e6bc;
            font-size: 13px;
            font-weight: bold;
            border-bottom: 1px solid rgba(213, 185, 95, 0.2);
            margin-bottom: 6px;
        }

        .session-menu-item {
            display: block;
            width: 100%;
            padding: 9px 10px;
            border: none;
            border-radius: 6px;
            background: transparent;
            color: #d6d1c2;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 13px;
            text-align: left;
            text-decoration: none;
            cursor: pointer;
        }

        .session-menu-item:hover {
            background: rgba(213, 185, 95, 0.1);
            color: #d5b95f;
        }

    `;

    document.head.appendChild(
        style
    );

}


/* ========================================
   CONSTRUIR EL MENÚ
======================================== */

function buildSessionMenu() {

    const playerNameElement =
        document.getElementById(
            "playerName"
        );

    if (
        !playerNameElement
    ) {

        return;

    }


    const trigger =
        playerNameElement.closest(
            ".player-name"
        ) || playerNameElement;


    trigger.classList.add(
        "session-trigger"
    );

    trigger.style.position =
        "relative";


    /*
        Avatar con la inicial
        del jugador.
    */

    const avatar =
        document.createElement(
            "div"
        );

    avatar.className =
        "session-avatar";

    avatar.textContent =
        getSessionPlayerName()
            .charAt(0)
            .toUpperCase();

    trigger.prepend(
        avatar
    );


    /*
        Menú desplegable.
    */

    const menu =
        document.createElement(
            "div"
        );

    menu.className =
        "session-menu";


    const nameRow =
        document.createElement(
            "div"
        );

    nameRow.className =
        "session-menu-name";

    nameRow.textContent =
        getSessionPlayerName();

    menu.appendChild(
        nameRow
    );


    if (
        isAdminUser()
    ) {

        const adminLink =
            document.createElement(
                "a"
            );

        adminLink.className =
            "session-menu-item";

        adminLink.href =
            "admin.html";

        adminLink.textContent =
            "🛡️ Panel de administrador";

        menu.appendChild(
            adminLink
        );

    }


    const logoutButton =
        document.createElement(
            "button"
        );

    logoutButton.type =
        "button";

    logoutButton.className =
        "session-menu-item";

    logoutButton.textContent =
        "🚪 Cerrar sesión";

    logoutButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            logoutSession();

        }
    );

    menu.appendChild(
        logoutButton
    );


    trigger.appendChild(
        menu
    );


    /*
        Abrir / cerrar el menú.
    */

    trigger.addEventListener(
        "click",
        function () {

            menu.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !trigger.contains(
                    event.target
                )
            ) {

                menu.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* ========================================
   INICIO
======================================== */

injectSessionMenuStyles();

buildSessionMenu();
