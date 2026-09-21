/* ========================================
   EL MISTERIO MAYA
   MATCH 3 ENGINE
   Versión limpia
======================================== */


/* ========================================
   CONFIGURACIÓN
======================================== */

const ROWS = 8;
const COLS = 8;

const SWIPE_THRESHOLD = 25;


/* ========================================
   PIEZAS NORMALES
======================================== */

const pieces = [

    {
        id: "jade",
        symbol: "💎"
    },

    {
        id: "corn",
        symbol: "🌽"
    },

    {
        id: "water",
        symbol: "💧"
    },

    {
        id: "fire",
        symbol: "🔥"
    },

    {
        id: "feather",
        symbol: "🪶"
    },

    {
        id: "glyph",
        symbol: "🗿"
    }

];


/* ========================================
   PIEZAS ESPECIALES
======================================== */

const specialPieces = {

    solar: {
        id: "solar",
        symbol: "☀️"
    },

    sunstone: {
        id: "sunstone",
        symbol: "🌞"
    }

};


/* ========================================
   NIVEL ACTUAL
======================================== */

let currentLevel =
    getCurrentLevel();


let levelData =
    levels[currentLevel - 1];


/* ========================================
   CONFIGURACIÓN DEL NIVEL
======================================== */

let TARGET_SCORE =
    levelData.targetScore;


let STARTING_MOVES =
    levelData.moves;


/* ========================================
   ESTADO DEL JUEGO
======================================== */

let board = [];

let score = 0;

let moves = STARTING_MOVES;

let selectedTile = null;

let isAnimating = false;


/* ========================================
   SWIPE
======================================== */

let swipeStartX = 0;

let swipeStartY = 0;

let swipeRow = null;

let swipeCol = null;


/* ========================================
   ELEMENTOS HTML
======================================== */

const gameBoard =
    document.getElementById(
        "gameBoard"
    );


const scoreElement =
    document.getElementById(
        "score"
    );


const movesElement =
    document.getElementById(
        "moves"
    );


const targetElement =
    document.getElementById(
        "target"
    );


const messageElement =
    document.getElementById(
        "message"
    );


const gameOver =
    document.getElementById(
        "gameOver"
    );


const resultTitle =
    document.getElementById(
        "resultTitle"
    );


const resultMessage =
    document.getElementById(
        "resultMessage"
    );


const finalScore =
    document.getElementById(
        "finalScore"
    );


/* ========================================
   PIEZA ALEATORIA
======================================== */

function randomPiece() {

    return pieces[
        Math.floor(
            Math.random() *
            pieces.length
        )
    ];

}


/* ========================================
   CREAR TABLERO
======================================== */

function createBoard() {

    board = [];

    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        board[row] = [];

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            let piece;

            do {

                piece =
                    randomPiece();

            } while (
                createsInitialMatch(
                    row,
                    col,
                    piece.id
                )
            );


            board[row][col] =
                piece.id;

        }

    }

}


/* ========================================
   EVITAR MATCH INICIAL
======================================== */

function createsInitialMatch(
    row,
    col,
    piece
) {

    /*
        Horizontal
    */

    if (
        col >= 2 &&
        board[row][col - 1] === piece &&
        board[row][col - 2] === piece
    ) {

        return true;

    }


    /*
        Vertical
    */

    if (
        row >= 2 &&
        board[row - 1][col] === piece &&
        board[row - 2][col] === piece
    ) {

        return true;

    }


    return false;

}


/* ========================================
   RENDERIZAR TABLERO
======================================== */

function renderBoard(
    matchedKeys = [],
    newKeys = []
) {

    gameBoard.innerHTML = "";


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            const tile =
                document.createElement(
                    "div"
                );


            tile.classList.add(
                "tile"
            );


            const key =
                `${row},${col}`;


            tile.dataset.row =
                row;

            tile.dataset.col =
                col;


            const pieceId =
                board[row][col];


            /*
                Mostrar pieza
            */

            if (
                pieceId !== null
            ) {

                const piece =
                    getPieceById(
                        pieceId
                    );


                if (
                    piece
                ) {

                    tile.textContent =
                        piece.symbol;

                }


                /*
                    Jade Solar
                */

                if (
                    pieceId ===
                    "solar"
                ) {

                    tile.classList.add(
                        "solar"
                    );

                }


                /*
                    Piedra del Sol
                */

                if (
                    pieceId ===
                    "sunstone"
                ) {

                    tile.classList.add(
                        "sunstone"
                    );

                }

            }


            /*
                Animación MATCH
            */

            if (
                matchedKeys.includes(
                    key
                )
            ) {

                tile.classList.add(
                    "matched"
                );

            }


            /*
                Animación piezas nuevas
            */

            if (
                newKeys.includes(
                    key
                )
            ) {

                tile.classList.add(
                    "new-tile"
                );

            }


            /*
                Click
            */

            tile.addEventListener(
                "click",
                function () {

                    selectTile(
                        row,
                        col,
                        tile
                    );

                }
            );


            /*
                Mouse
            */

            tile.addEventListener(
                "mousedown",
                function (event) {

                    startSwipe(
                        event,
                        row,
                        col
                    );

                }
            );


            /*
                Touch
            */

            tile.addEventListener(
                "touchstart",
                function (event) {

                    startSwipe(
                        event,
                        row,
                        col
                    );

                },
                {
                    passive: true
                }
            );


            tile.addEventListener(
                "touchend",
                function (event) {

                    endSwipe(
                        event
                    );

                },
                {
                    passive: true
                }
            );


            gameBoard.appendChild(
                tile
            );

        }

    }

}


/* ========================================
   BUSCAR PIEZA
======================================== */

function getPieceById(
    id
) {

    if (
        id === "solar"
    ) {

        return specialPieces.solar;

    }


    if (
        id === "sunstone"
    ) {

        return specialPieces.sunstone;

    }


    return pieces.find(
        piece =>
            piece.id === id
    );

}


/* ========================================
   CLICK
======================================== */

function selectTile(
    row,
    col,
    element
) {

    if (
        isAnimating
    ) {

        return;

    }


    /*
        Primera pieza
    */

    if (
        !selectedTile
    ) {

        selectedTile = {

            row,
            col,
            element

        };


        element.classList.add(
            "selected"
        );


        messageElement.textContent =
            "Selecciona una pieza cercana.";

        return;

    }


    const first =
        selectedTile;


    first.element.classList.remove(
        "selected"
    );


    /*
        Misma pieza
    */

    if (
        first.row === row &&
        first.col === col
    ) {

        selectedTile =
            null;

        return;

    }


    /*
        Deben estar juntas
    */

    if (
        !areAdjacent(
            first.row,
            first.col,
            row,
            col
        )
    ) {

        selectedTile =
            null;

        messageElement.textContent =
            "Solo puedes mover piezas cercanas.";

        return;

    }


    selectedTile =
        null;


    swapPieces(
        first.row,
        first.col,
        row,
        col
    );

}


/* ========================================
   SWIPE
======================================== */

function startSwipe(
    event,
    row,
    col
) {

    if (
        isAnimating
    ) {

        return;

    }


    swipeRow =
        row;


    swipeCol =
        col;


    if (
        event.touches &&
        event.touches.length > 0
    ) {

        swipeStartX =
            event.touches[0].clientX;


        swipeStartY =
            event.touches[0].clientY;

    }
    else {

        swipeStartX =
            event.clientX;


        swipeStartY =
            event.clientY;

    }

}


/* ========================================
   TERMINAR SWIPE
======================================== */

function endSwipe(
    event
) {

    if (
        isAnimating
    ) {

        return;

    }


    if (
        swipeRow === null ||
        swipeCol === null
    ) {

        return;

    }


    let endX;

    let endY;


    if (
        event.changedTouches &&
        event.changedTouches.length > 0
    ) {

        endX =
            event.changedTouches[0].clientX;


        endY =
            event.changedTouches[0].clientY;

    }
    else {

        endX =
            event.clientX;


        endY =
            event.clientY;

    }


    const deltaX =
        endX -
        swipeStartX;


    const deltaY =
        endY -
        swipeStartY;


    const distance =
        Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );


    /*
        Movimiento demasiado pequeño
    */

    if (
        distance <
        SWIPE_THRESHOLD
    ) {

        resetSwipe();

        return;

    }


    let targetRow =
        swipeRow;


    let targetCol =
        swipeCol;


    /*
        Horizontal
    */

    if (
        Math.abs(deltaX) >
        Math.abs(deltaY)
    ) {

        if (
            deltaX > 0
        ) {

            targetCol++;

        }
        else {

            targetCol--;

        }

    }


    /*
        Vertical
    */

    else {

        if (
            deltaY > 0
        ) {

            targetRow++;

        }
        else {

            targetRow--;

        }

    }


    /*
        Comprobar límites
    */

    if (
        targetRow < 0 ||
        targetRow >= ROWS ||
        targetCol < 0 ||
        targetCol >= COLS
    ) {

        resetSwipe();

        return;

    }


    swapPieces(
        swipeRow,
        swipeCol,
        targetRow,
        targetCol
    );


    resetSwipe();

}


/* ========================================
   REINICIAR SWIPE
======================================== */

function resetSwipe() {

    swipeStartX = 0;

    swipeStartY = 0;

    swipeRow = null;

    swipeCol = null;

}


/* ========================================
   PIEZAS ADYACENTES
======================================== */

function areAdjacent(
    row1,
    col1,
    row2,
    col2
) {

    return (
        Math.abs(
            row1 - row2
        ) +
        Math.abs(
            col1 - col2
        ) === 1
    );

}


/* ========================================
   INTERCAMBIAR
======================================== */

async function swapPieces(
    row1,
    col1,
    row2,
    col2
) {

    if (
        isAnimating
    ) {

        return;

    }


    isAnimating =
        true;


    const firstPiece =
        board[row1][col1];


    const secondPiece =
        board[row2][col2];


    /*
        Intercambio
    */

    board[row1][col1] =
        secondPiece;


    board[row2][col2] =
        firstPiece;


    /*
        Si hay Piedra del Sol
    */

    if (
        firstPiece === "sunstone" ||
        secondPiece === "sunstone"
    ) {

        const sunstonePosition =
            firstPiece === "sunstone"
                ? {
                    row: row1,
                    col: col1
                }
                : {
                    row: row2,
                    col: col2
                };


        await activateSunstone(
            sunstonePosition.row,
            sunstonePosition.col
        );


        moves--;


        updateHUD();


        const gameFinished =
            checkGameState();


        isAnimating =
            gameFinished;


        return;

    }


    /*
        Si hay Jade Solar
    */

    if (
        firstPiece === "solar" ||
        secondPiece === "solar"
    ) {

        const solarPosition =
            firstPiece === "solar"
                ? {
                    row: row1,
                    col: col1
                }
                : {
                    row: row2,
                    col: col2
                };


        await activateSolar(
            solarPosition.row
        );


        moves--;


        updateHUD();


        const gameFinished =
            checkGameState();


        isAnimating =
            gameFinished;


        return;

    }


    /*
        Mostrar intercambio
    */

    renderBoard();


    /*
        Buscar matches
    */

    const groups =
        findMatchGroups();


    /*
        Movimiento inválido
    */

    if (
        groups.length === 0
    ) {

        await delay(250);


        /*
            Deshacer intercambio
        */

        board[row1][col1] =
            firstPiece;


        board[row2][col2] =
            secondPiece;


        renderBoard();


        messageElement.textContent =
            "No se formó ninguna combinación.";


        isAnimating =
            false;


        return;

    }


    /*
        Movimiento válido
    */

    moves--;


    updateHUD();


    /*
        Procesar matches,
        cascadas y nuevas piezas
    */

    await processMatches(
        groups
    );


    /*
        Comprobar si ganamos
        o perdimos
    */

    const gameFinished =
        checkGameState();


    isAnimating =
        gameFinished;

}


/* ========================================
   BUSCAR GRUPOS
======================================== */

function findMatchGroups() {

    const groups = [];


    /*
        HORIZONTAL
    */

    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        let start = 0;


        for (
            let col = 1;
            col <= COLS;
            col++
        ) {

            const same =
                col < COLS &&
                isNormalPiece(
                    board[row][col]
                ) &&
                board[row][col] ===
                board[row][col - 1];


            if (
                !same
            ) {

                const length =
                    col - start;


                if (
                    length >= 3 &&
                    isNormalPiece(
                        board[row][start]
                    )
                ) {

                    const cells = [];


                    for (
                        let c = start;
                        c < col;
                        c++
                    ) {

                        cells.push(
                            `${row},${c}`
                        );

                    }


                    groups.push(
                        cells
                    );

                }


                start =
                    col;

            }

        }

    }


    /*
        VERTICAL
    */

    for (
        let col = 0;
        col < COLS;
        col++
    ) {

        let start = 0;


        for (
            let row = 1;
            row <= ROWS;
            row++
        ) {

            const same =
                row < ROWS &&
                isNormalPiece(
                    board[row][col]
                ) &&
                board[row][col] ===
                board[row - 1][col];


            if (
                !same
            ) {

                const length =
                    row - start;


                if (
                    length >= 3 &&
                    isNormalPiece(
                        board[start][col]
                    )
                ) {

                    const cells = [];


                    for (
                        let r = start;
                        r < row;
                        r++
                    ) {

                        cells.push(
                            `${r},${col}`
                        );

                    }


                    groups.push(
                        cells
                    );

                }


                start =
                    row;

            }

        }

    }


    return groups;

}


/* ========================================
   PIEZA NORMAL
======================================== */

function isNormalPiece(
    piece
) {

    return (
        piece !== null &&
        piece !== "solar" &&
        piece !== "sunstone"
    );

}


/* ========================================
   PROCESAR MATCHES
======================================== */

async function processMatches(
    groups
) {

    let combo = 0;


    while (
        groups.length > 0
    ) {

        combo++;


        const matched =
            new Set();


        /*
            Unir grupos
        */

        groups.forEach(
            group => {

                group.forEach(
                    key => {

                        matched.add(
                            key
                        );

                    }
                );

            }
        );


        /*
            Determinar pieza especial
        */

        let specialKey = null;

        let specialType = null;


        /*
            5 o más = Piedra del Sol
        */

        for (
            const group of groups
        ) {

            if (
                group.length >= 5
            ) {

                specialKey =
                    group[
                        Math.floor(
                            group.length / 2
                        )
                    ];

                specialType =
                    "sunstone";

                break;

            }

        }


        /*
            4 = Jade Solar
        */

        if (
            !specialKey
        ) {

            for (
                const group of groups
            ) {

                if (
                    group.length === 4
                ) {

                    specialKey =
                        group[
                            Math.floor(
                                group.length / 2
                            )
                        ];

                    specialType =
                        "solar";

                    break;

                }

            }

        }


        /*
            Puntuación
        */

        score +=
            matched.size *
            10 *
            combo;


        /*
            Mensaje
        */

        if (
            combo > 1
        ) {

            messageElement.textContent =
                `¡COMBO x${combo}!`;

            messageElement.classList.add(
                "combo"
            );

        }
        else {

            messageElement.textContent =
                "¡MATCH!";

        }


        /*
            Animación
        */

        renderBoard(
            [...matched]
        );


        await delay(400);


        /*
            Eliminar piezas
        */

        matched.forEach(
            key => {

                if (
                    key !== specialKey
                ) {

                    const [
                        row,
                        col
                    ] =
                        key
                        .split(",")
                        .map(Number);


                    board[row][col] =
                        null;

                }

            }
        );


        /*
            Crear pieza especial
        */

        if (
            specialKey
        ) {

            const [
                specialRow,
                specialCol
            ] =
                specialKey
                .split(",")
                .map(Number);


            board[specialRow][specialCol] =
                specialType;


            if (
                specialType ===
                "sunstone"
            ) {

                score += 200;


                messageElement.textContent =
                    "🌞 ¡PIEDRA DEL SOL CREADA!";

            }
            else {

                score += 100;


                messageElement.textContent =
                    "☀️ ¡JADE SOLAR CREADO!";

            }


            renderBoard();


            await delay(500);

        }
        else {

            renderBoard();

        }


        /*
            Caída
        */

        dropPieces();


        renderBoard();


        await delay(350);


        /*
            Nuevas piezas
        */

        fillEmptySpaces();


        await delay(350);


        /*
            Buscar cascadas
        */

        groups =
            findMatchGroups();

    }


    messageElement.classList.remove(
        "combo"
    );


    updateHUD();

}


/* ========================================
   ACTIVAR JADE SOLAR
======================================== */

async function activateSolar(
    row
) {

    messageElement.textContent =
        "☀️ ¡JADE SOLAR!";


    renderBoard();


    const solarTiles =
        document.querySelectorAll(
            ".solar"
        );


    solarTiles.forEach(
        tile => {

            tile.classList.add(
                "solar-explode"
            );

        }
    );


    await delay(500);


    /*
        Eliminar fila
    */

    for (
        let col = 0;
        col < COLS;
        col++
    ) {

        board[row][col] =
            null;

    }


    score += 150;


    renderBoard();


    await delay(250);


    dropPieces();


    renderBoard();


    await delay(350);


    fillEmptySpaces();


    await delay(350);

}


/* ========================================
   ACTIVAR PIEDRA DEL SOL
======================================== */

async function activateSunstone(
    row,
    col
) {

    messageElement.textContent =
        "🌞 ¡PIEDRA DEL SOL!";


    renderBoard();


    const sunstoneTiles =
        document.querySelectorAll(
            ".sunstone"
        );


    sunstoneTiles.forEach(
        tile => {

            tile.classList.add(
                "solar-explode"
            );

        }
    );


    await delay(500);


    /*
        Elegimos una pieza
        aleatoria del tablero.
    */

    let targetPiece = null;


    for (
        let r = 0;
        r < ROWS;
        r++
    ) {

        for (
            let c = 0;
            c < COLS;
            c++
        ) {

            if (
                isNormalPiece(
                    board[r][c]
                )
            ) {

                targetPiece =
                    board[r][c];

                break;

            }

        }


        if (
            targetPiece
        ) {

            break;

        }

    }


    /*
        Eliminar todas las piezas
        del tipo seleccionado.
    */

    if (
        targetPiece
    ) {

        for (
            let r = 0;
            r < ROWS;
            r++
        ) {

            for (
                let c = 0;
                c < COLS;
                c++
            ) {

                if (
                    board[r][c] ===
                    targetPiece
                ) {

                    board[r][c] =
                        null;

                    score += 20;

                }

            }

        }

    }


    /*
        Eliminar también
        la Piedra del Sol.
    */

    board[row][col] =
        null;


    score += 250;


    renderBoard();


    await delay(300);


    dropPieces();


    renderBoard();


    await delay(350);


    fillEmptySpaces();


    await delay(350);

}


/* ========================================
   HACER CAER PIEZAS
======================================== */

function dropPieces() {

    for (
        let col = 0;
        col < COLS;
        col++
    ) {

        let emptyRow =
            ROWS - 1;


        for (
            let row = ROWS - 1;
            row >= 0;
            row--
        ) {

            if (
                board[row][col] !== null
            ) {

                board[emptyRow][col] =
                    board[row][col];


                if (
                    emptyRow !== row
                ) {

                    board[row][col] =
                        null;

                }


                emptyRow--;

            }

        }

    }

}


/* ========================================
   RELLENAR ESPACIOS
======================================== */

function fillEmptySpaces() {

    const newKeys = [];


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            if (
                board[row][col] === null
            ) {

                board[row][col] =
                    randomPiece().id;


                newKeys.push(
                    `${row},${col}`
                );

            }

        }

    }


    renderBoard(
        [],
        newKeys
    );

}


/* ========================================
   ACTUALIZAR HUD
======================================== */

function updateHUD() {

    scoreElement.textContent =
        score;


    movesElement.textContent =
        moves;


    targetElement.textContent =
        TARGET_SCORE;

}


/* ========================================
   INFORMACIÓN DEL NIVEL
======================================== */

function updateLevelInterface() {

    const missionTitle =
        document.querySelector(
            ".mission strong"
        );


    const missionDescription =
        document.querySelector(
            ".mission p"
        );


    const missionIcon =
        document.querySelector(
            ".mission > div:first-child"
        );


    if (
        missionTitle
    ) {

        missionTitle.textContent =
            `NIVEL ${levelData.id} — ${levelData.name.toUpperCase()}`;

    }


    if (
        missionDescription
    ) {

        missionDescription.textContent =
            levelData.description;

    }


    if (
        missionIcon
    ) {

        missionIcon.textContent =
            levelData.icon;

    }


    targetElement.textContent =
        levelData.targetScore;

}


/* ========================================
   COMPROBAR ESTADO
======================================== */

function checkGameState() {

    /*
        Ganó
    */

    if (
        score >=
        TARGET_SCORE
    ) {

        finishLevel(
            true
        );


        return true;

    }


    /*
        Perdió
    */

    if (
        moves <= 0
    ) {

        finishLevel(
            false
        );


        return true;

    }


    /*
        El nivel continúa
    */

    return false;

}


/* ========================================
   FINAL DEL NIVEL
======================================== */

function finishLevel(
    won
) {

    isAnimating =
        true;


    if (
        won
    ) {

        resultTitle.textContent =
            "¡NIVEL COMPLETADO!";


        resultMessage.textContent =
            `Has completado ${levelData.name}. ¡Has descubierto una nueva pista!`;


        /*
            Guardar récord
        */

        saveHighScore(
            score
        );

        /*
            Guardar mejor puntuación
            de este nivel
        */

        saveLevelHighScore(
            currentLevel,
            score
        );

        /*
            Desbloquear siguiente nivel
        */

        if (
            currentLevel <
            levels.length
        ) {

            saveCurrentLevel(
                currentLevel + 1
            );

        }

        /*
            Estrellas
        */

        const stars =
            document.getElementById(
                "stars"
            );


        let earnedStars = 1;


        if (
            score >=
            TARGET_SCORE * 2
        ) {

            earnedStars = 3;

            stars.textContent =
                "⭐⭐⭐";

        }
        else if (
            score >=
            TARGET_SCORE * 1.5
        ) {

            earnedStars = 2;

            stars.textContent =
                "⭐⭐";

        }
        else {

            earnedStars = 1;

            stars.textContent =
                "⭐";

        }


        /*
            Guardar las mejores estrellas
            del nivel
        */

        saveLevelStars(
            currentLevel,
            earnedStars
        );

    }
    else {

        resultTitle.textContent =
            "FIN DEL NIVEL";


        resultMessage.textContent =
            "Te has quedado sin movimientos. ¡Inténtalo nuevamente!";


        const stars =
            document.getElementById(
                "stars"
            );


        if (
            stars
        ) {

            stars.textContent =
                "☆☆☆";

        }

    }


    finalScore.textContent =
        score;


    gameOver.classList.remove(
        "hidden"
    );

}


/* ========================================
   REINICIAR NIVEL
======================================== */

function restartGame() {

    /*
        Obtener configuración
        actualizada del nivel
    */

    levelData =
        levels[
            currentLevel - 1
        ];


    TARGET_SCORE =
        levelData.targetScore;


    STARTING_MOVES =
        levelData.moves;


    score = 0;


    moves =
        STARTING_MOVES;


    selectedTile =
        null;


    isAnimating =
        false;


    resetSwipe();


    gameOver.classList.add(
        "hidden"
    );


    createBoard();


    renderBoard();


    updateHUD();


    updateLevelInterface();


    /*
        👤 Mostrar nombre del jugador
    */

    const playerNameElement =
        document.getElementById(
            "playerName"
        );


    if (
        playerNameElement
    ) {

        playerNameElement.textContent =
            getPlayerName();

    }


    messageElement.textContent =
        "Desliza una pieza para moverla.";

}
/* ========================================
   CONTINUAR DESDE EL NIVEL
======================================== */

document
    .getElementById(
        "continueButton"
    )
    .addEventListener(
        "click",
        async function () {

            /*
                Si ganó
            */

            if (
                score >=
                TARGET_SCORE
            ) {

                /*
                    ¿Existe un siguiente nivel?
                */

                if (
                    currentLevel <
                    levels.length
                ) {

                    /*
                        Desbloquear
                        siguiente nivel
                    */

                    currentLevel++;


                    saveCurrentLevel(
                        currentLevel
                    );


                    /*
                        Mostrar anuncio
                        si corresponde.
                    */

                    await showAdAfterLevel();


                    /*
                        Después del anuncio,
                        regresar al mapa.
                    */

                    window.location.href =
                        "map.html";

                }
                else {

                    /*
                        Se completaron
                        todos los niveles.
                    */

                    resultTitle.textContent =
                        "🏆 ¡AVENTURA COMPLETADA!";


                    resultMessage.textContent =
                        "Has descubierto todos los secretos disponibles del Misterio Maya.";

                }

            }
            else {

                /*
                    Si perdió,
                    reiniciar nivel.
                */

                restartGame();

            }

        }
    );


    
/* ========================================
   REINICIAR BOTÓN
======================================== */

document
    .getElementById(
        "restartButton"
    )
    .addEventListener(
        "click",
        restartGame
    );


/* ========================================
   DELAY
======================================== */

function delay(
    milliseconds
) {

    return new Promise(
        resolve =>

            setTimeout(
                resolve,
                milliseconds
            )

    );

}


/* ========================================
   INICIAR JUEGO
======================================== */

restartGame();