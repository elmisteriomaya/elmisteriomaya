function getPlayerName() {

    return (
        localStorage.getItem(
            "mayaPlayer"
        ) || "Guerrero"
    );

}


function getCurrentLevel() {

    return parseInt(
        localStorage.getItem(
            "mayaLevel"
        ) || "1"
    );

}


function saveCurrentLevel(
    level
) {

    localStorage.setItem(
        "mayaLevel",
        level
    );

}


function saveHighScore(
    score
) {

    const current =
        parseInt(
            localStorage.getItem(
                "mayaHighScore"
            ) || "0"
        );


    if (
        score > current
    ) {

        localStorage.setItem(
            "mayaHighScore",
            score
        );

    }

}


function getHighScore() {

    return parseInt(
        localStorage.getItem(
            "mayaHighScore"
        ) || "0"
    );

}

/* ========================================
   ESTRELLAS POR NIVEL
======================================== */

function saveLevelStars(
    level,
    stars
) {

    const currentStars =
        parseInt(
            localStorage.getItem(
                `mayaStars_${level}`
            )
        ) || 0;


    /*
        Solo guardar si la nueva
        puntuación de estrellas
        es mejor.
    */

    if (
        stars > currentStars
    ) {

        localStorage.setItem(
            `mayaStars_${level}`,
            stars
        );

    }

}


function getLevelStars(
    level
) {

    return parseInt(
        localStorage.getItem(
            `mayaStars_${level}`
        )
    ) || 0;

}

/* ========================================
   MEJOR PUNTUACIÓN POR NIVEL
======================================== */

function saveLevelHighScore(
    level,
    score
) {

    const currentScore =
        parseInt(
            localStorage.getItem(
                `mayaHighScore_${level}`
            )
        ) || 0;


    /*
        Solo guardar si la nueva
        puntuación es mayor.
    */

    if (
        score > currentScore
    ) {

        localStorage.setItem(
            `mayaHighScore_${level}`,
            score
        );

    }

}


function getLevelHighScore(
    level
) {

    return parseInt(
        localStorage.getItem(
            `mayaHighScore_${level}`
        )
    ) || 0;

}

