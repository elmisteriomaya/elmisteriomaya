/* ========================================
   EL MISTERIO MAYA
   ESTADÍSTICAS
======================================== */


/* ========================================
   ELEMENTOS
======================================== */

const playerName =
    document.getElementById(
        "playerName"
    );

const totalScenarios =
    document.getElementById(
        "totalScenarios"
    );

const detectedScenarios =
    document.getElementById(
        "detectedScenarios"
    );

const compromisedScenarios =
    document.getElementById(
        "compromisedScenarios"
    );

const susceptibility =
    document.getElementById(
        "susceptibility"
    );

const susceptibilityIcon =
    document.getElementById(
        "susceptibilityIcon"
    );

const susceptibilityTitle =
    document.getElementById(
        "susceptibilityTitle"
    );

const susceptibilityMessage =
    document.getElementById(
        "susceptibilityMessage"
    );

const attackResults =
    document.getElementById(
        "attackResults"
    );

const recommendations =
    document.getElementById(
        "recommendations"
    );

const backButton =
    document.getElementById(
        "backButton"
    );


/* ========================================
   NOMBRE DEL JUGADOR
======================================== */

function loadPlayerName() {

    const name =
        localStorage.getItem(
            "mayaPlayer"
        ) || "Jugador";


    playerName.textContent =
        name;

}


/* ========================================
   OBTENER RESULTADOS
======================================== */

function getSecurityResults() {

    return JSON.parse(
        localStorage.getItem(
            "mayaSecurityResults"
        ) || "[]"
    );

}


/* ========================================
   CALCULAR RESUMEN
======================================== */

function calculateSummary(
    results
) {

    const total =
        results.length;


    const detected =
        results.filter(
            result =>
                result.result ===
                "detected"
        ).length;


    const compromised =
        results.filter(
            result =>
                result.result ===
                "compromised"
        ).length;


    let percentage = 0;


    if (
        total > 0
    ) {

        percentage =
            (
                compromised /
                total
            ) * 100;

    }


    return {

        total,
        detected,
        compromised,
        percentage

    };

}


/* ========================================
   MOSTRAR RESUMEN
======================================== */

function renderSummary(
    summary
) {

    totalScenarios.textContent =
        summary.total;

    detectedScenarios.textContent =
        summary.detected;

    compromisedScenarios.textContent =
        summary.compromised;

    susceptibility.textContent =
        `${summary.percentage.toFixed(1)}%`;

}


/* ========================================
   NIVEL DE SUSCEPTIBILIDAD
======================================== */

function renderSusceptibility(
    percentage,
    total
) {

    if (
        total === 0
    ) {

        susceptibilityIcon.textContent =
            "🟢";

        susceptibilityTitle.textContent =
            "Sin resultados";

        susceptibilityMessage.textContent =
            "Completa algunos escenarios para generar tu reporte.";

        return;

    }


    /*
        Baja susceptibilidad
    */

    if (
        percentage <= 20
    ) {

        susceptibilityIcon.textContent =
            "🟢";

        susceptibilityTitle.textContent =
            "Baja susceptibilidad";

        susceptibilityMessage.textContent =
            "Has demostrado una buena capacidad para identificar situaciones sospechosas.";

    }


    /*
        Susceptibilidad moderada
    */

    else if (
        percentage <= 50
    ) {

        susceptibilityIcon.textContent =
            "🟡";

        susceptibilityTitle.textContent =
            "Susceptibilidad moderada";

        susceptibilityMessage.textContent =
            "Algunas situaciones lograron generar una interacción riesgosa. Mantén especial atención ante mensajes inesperados.";

    }


    /*
        Alta susceptibilidad
    */

    else {

        susceptibilityIcon.textContent =
            "🔴";

        susceptibilityTitle.textContent =
            "Alta susceptibilidad";

        susceptibilityMessage.textContent =
            "Varias situaciones lograron generar interacciones riesgosas. Se recomienda reforzar la identificación de señales de ingeniería social.";

    }

}


/* ========================================
   NOMBRES DE LOS TIPOS
======================================== */

const attackNames = {

    phishing:
        "🎣 Phishing",

    smishing:
        "📱 Smishing",

    quishing:
        "📷 Quishing",

    vishing:
        "📞 Vishing",

    spear_phishing:
        "🎯 Spear phishing",

    clone_phishing:
        "🧬 Clone phishing"

};


/* ========================================
   RESULTADOS POR TIPO
======================================== */

function renderAttackResults(
    results
) {

    attackResults.innerHTML =
        "";


    const types =
        Object.keys(
            attackNames
        );


    if (
        results.length === 0
    ) {

        attackResults.innerHTML =

            `<div class="no-results">
                Todavía no hay escenarios evaluados.
             </div>`;

        return;

    }


    types.forEach(
        function(type) {

            const typeResults =
                results.filter(
                    result =>
                        result.type ===
                        type
                );


            /*
                Si todavía no aparece
                este tipo, mostrar 0.
            */

            const total =
                typeResults.length;


            const compromised =
                typeResults.filter(
                    result =>
                        result.result ===
                        "compromised"
                ).length;


            let percentage = 0;


            if (
                total > 0
            ) {

                percentage =
                    (
                        compromised /
                        total
                    ) * 100;

            }


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "attack-row";


            row.innerHTML = `

                <div class="attack-name">

                    ${attackNames[type]}

                </div>


                <div class="progress-background">

                    <div
                        class="progress-bar"
                        style="width: ${percentage}%"
                    >
                    </div>

                </div>


                <div class="attack-percentage">

                    ${percentage.toFixed(1)}%

                </div>

            `;


            attackResults.appendChild(
                row
            );

        }
    );

}


/* ========================================
   RECOMENDACIONES
======================================== */

function renderRecommendations(
    results
) {

    recommendations.innerHTML =
        "";


    if (
        results.length === 0
    ) {

        recommendations.innerHTML = `

            <div class="no-results">

                Completa algunos escenarios
                para recibir recomendaciones.

            </div>

        `;

        return;

    }


    /*
        Contar interacciones riesgosas
        por tipo.
    */

    const riskByType = {};


    results.forEach(
        function(result) {

            if (
                result.result !==
                "compromised"
            ) {

                return;

            }


            if (
                !riskByType[
                    result.type
                ]
            ) {

                riskByType[
                    result.type
                ] = 0;

            }


            riskByType[
                result.type
            ]++;

        }
    );


    /*
        Buscar el tipo
        con más errores.
    */

    let highestType =
        null;

    let highestValue =
        0;


    Object.keys(
        riskByType
    ).forEach(
        function(type) {

            if (
                riskByType[type] >
                highestValue
            ) {

                highestValue =
                    riskByType[type];

                highestType =
                    type;

            }

        }
    );


    /*
        Si no hubo errores.
    */

    if (
        highestType ===
        null
    ) {

        recommendations.innerHTML = `

            <div class="recommendation">

                <strong>
                    ✅ ¡Excelente trabajo!
                </strong>

                <br>

                No registraste interacciones
                riesgosas en los escenarios
                realizados.

                Continúa verificando
                cuidadosamente los mensajes,
                enlaces y solicitudes
                inesperadas.

            </div>

        `;

        return;

    }


    /*
        Recomendaciones específicas.
    */

    const messages = {

        phishing:
            "Verifica siempre el remitente, el enlace y el contexto antes de interactuar con correos o mensajes inesperados.",

        smishing:
            "Evita utilizar enlaces recibidos por SMS. Accede directamente a la aplicación o sitio oficial del servicio.",

        quishing:
            "Verifica el origen de los códigos QR antes de escanearlos y evita introducir información sensible en sitios desconocidos.",

        vishing:
            "Ante llamadas inesperadas, no compartas información sensible. Finaliza la llamada y contacta directamente con la institución.",

        spear_phishing:
            "Un mensaje personalizado puede seguir siendo fraudulento. Confirma solicitudes inesperadas mediante otro canal.",

        clone_phishing:
            "No confíes solamente en la apariencia de un mensaje. Verifica el remitente y el destino real de los enlaces."
    };


    const recommendation =
        document.createElement(
            "div"
        );


    recommendation.className =
        "recommendation";


    recommendation.innerHTML = `

        <strong>
            ⚠️ Área de atención:
            ${attackNames[highestType]}
        </strong>

        <br><br>

        ${messages[highestType]}

    `;


    recommendations.appendChild(
        recommendation
    );

}


/* ========================================
   VOLVER AL MAPA
======================================== */

backButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "map.html";

    }
);


/* ========================================
   INICIAR
======================================== */

function initializeStatistics() {

    loadPlayerName();


    const results =
        getSecurityResults();


    const summary =
        calculateSummary(
            results
        );


    renderSummary(
        summary
    );


    renderSusceptibility(
        summary.percentage,
        summary.total
    );


    renderAttackResults(
        results
    );


    renderRecommendations(
        results
    );

}


initializeStatistics();