/* ========================================
   EL MISTERIO MAYA
   MAPA DE NIVELES
======================================== */


/* ========================================
   ELEMENTOS
======================================== */

const levelMap =
    document.getElementById(
        "levelMap"
    );


const playerNameElement =
    document.getElementById(
        "playerName"
    );


const progressText =
    document.getElementById(
        "progressText"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


/* ========================================
   PROGRESO
======================================== */

const currentLevel =
    getCurrentLevel();


/* ========================================
   NOMBRE
======================================== */

playerNameElement.textContent =
    getPlayerName();


/* ========================================
   PROGRESO
======================================== */

progressText.textContent =
    `${Math.min(
        currentLevel,
        levels.length
    )} / ${levels.length}`;


/* ========================================
   ESTRELLAS
======================================== */

function getStars(
    level
) {

    const stars =
        getLevelStars(
            level
        );


    return (
        "⭐".repeat(stars) +
        "☆".repeat(
            3 - stars
        )
    );

}


/* ========================================
   CREAR NIVEL
======================================== */

function createLevelNode(
    level,
    index
) {

    const levelNumber =
        index + 1;


    /*
        Un nivel está
        desbloqueado si es
        menor o igual al
        progreso actual.
    */

    const unlocked =
        levelNumber <=
        currentLevel;


    const isCurrent =
        levelNumber ===
        currentLevel;


    const node =
        document.createElement(
            "div"
        );


    node.classList.add(
        "level-node"
    );


    if (
        unlocked
    ) {

        node.classList.add(
            "unlocked"
        );

    }
    else {

        node.classList.add(
            "locked"
        );

    }


    if (
        isCurrent
    ) {

        node.classList.add(
            "current"
        );

    }


    /*
        Icono
    */

    const icon =
        document.createElement(
            "div"
        );


    icon.classList.add(
        "level-icon"
    );


    icon.textContent =
        level.icon;


    /*
        Información
    */

    const info =
        document.createElement(
            "div"
        );


    info.classList.add(
        "level-info"
    );


    const number =
        document.createElement(
            "div"
        );


    number.classList.add(
        "level-number"
    );


    number.textContent =
        `NIVEL ${level.id}`;


    const name =
        document.createElement(
            "div"
        );


    name.classList.add(
        "level-name"
    );


    name.textContent =
        level.name;


    const description =
        document.createElement(
            "div"
        );


    description.classList.add(
        "level-description"
    );


    description.textContent =
        level.description;


    const stars =
        document.createElement(
            "div"
        );


    stars.classList.add(
        "level-stars"
    );


    stars.textContent =
        getStars(
            levelNumber
        );


    info.appendChild(
        number
    );


    info.appendChild(
        name
    );


    info.appendChild(
        description
    );


    info.appendChild(
        stars
    );

    const highScore =
    document.createElement(
        "div"
    );


    highScore.classList.add(
        "level-high-score"
    );


    highScore.textContent =
        `🏆 Mejor: ${getLevelHighScore(
            levelNumber
        )}`;


    info.appendChild(
        highScore
    );

    /*
        Estado
    */

    const status =
        document.createElement(
            "div"
        );


    status.classList.add(
        "level-status"
    );


    if (
        unlocked
    ) {

        status.textContent =
            isCurrent
                ? "▶️"
                : "🔓";

    }
    else {

        status.textContent =
            "🔒";

    }


    /*
        Agregar elementos
    */

    node.appendChild(
        icon
    );


    node.appendChild(
        info
    );


    node.appendChild(
        status
    );


    /*
        Click
    */

    if (
        unlocked
    ) {

        node.addEventListener(
            "click",
            function () {

                startLevel(
                    levelNumber
                );

            }
        );

    }


    return node;

}


/* ========================================
   CONECTORES
======================================== */

function createConnector() {

    const connector =
        document.createElement(
            "div"
        );


    connector.classList.add(
        "level-connector"
    );


    return connector;

}


/* ========================================
   CONSTRUIR MAPA
======================================== */

function buildMap() {

    levelMap.innerHTML =
        "";


    levels.forEach(
        function (
            level,
            index
        ) {

            const node =
                createLevelNode(
                    level,
                    index
                );


            levelMap.appendChild(
                node
            );


            /*
                No poner conector
                después del último
            */

            if (
                index <
                levels.length - 1
            ) {

                levelMap.appendChild(
                    createConnector()
                );

            }

        }
    );

}


/* ========================================
   INICIAR NIVEL
======================================== */

function startLevel(
    level
) {

    /*
        Guardamos el nivel
        seleccionado.
    */

    localStorage.setItem(
        "mayaSelectedLevel",
        level
    );


    /*
        game.js utiliza
        mayaLevel como
        nivel actual.
    */

    saveCurrentLevel(
        level
    );


    /*
        Ir al juego.
    */

    window.location.href =
        "game.html";

}


/* ========================================
   VOLVER
======================================== */

backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "game.html";

    }
);


/* ========================================
   INICIAR
======================================== */

buildMap();

/* ========================================
   ESTADÍSTICAS
======================================== */

const statisticsButton =
    document.getElementById(
        "statisticsButton"
    );


statisticsButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "statistics.html";

    }
);

/* ========================================
   REINICIAR JUEGO
======================================== */

const resetButton =
    document.getElementById(
        "resetButton"
    );


resetButton.addEventListener(
    "click",
    function () {

        const confirmation =
            confirm(
                "¿Estás seguro de que deseas reiniciar todo tu progreso?"
            );


        if (!confirmation) {

            return;

        }


        /*
            Eliminar progreso
        */

        localStorage.removeItem(
            "mayaLevel"
        );

        localStorage.removeItem(
            "mayaSelectedLevel"
        );

        localStorage.removeItem(
            "mayaHighScore"
        );


        /*
            Eliminar estrellas
        */

        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            localStorage.removeItem(
                `mayaStars_${i}`
            );

            localStorage.removeItem(
                `mayaHighScore_${i}`
            );

        }


        /*
            Reiniciar estadísticas
        */

        localStorage.removeItem(
            "mayaStatistics"
        );


        /*
            Volver al nivel 1
        */

        localStorage.setItem(
            "mayaLevel",
            "1"
        );


        window.location.reload();

    }
);