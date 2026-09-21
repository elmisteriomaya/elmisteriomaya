/* ========================================
   EL MISTERIO MAYA
   PANEL DE ADMINISTRADOR
======================================== */


/*
    ====================================================
    ACCESO DE ADMINISTRADOR
    ====================================================

    Ya NO se usa una clave temporal.

    ADMIN_USERNAMES, isAdminUser() y logoutSession() están
    definidas en sesion.js (se incluye antes que este
    archivo en admin.html), para no repetir la lista de
    admins en dos lugares distintos.
    ====================================================
*/


const ROWS_PER_PAGE = 5;


/*
    Página actual de la tabla
    de interacciones riesgosas.
*/

let currentPage = 1;


/* ========================================
   ELEMENTOS - ACCESO
======================================== */

const adminGate =
    document.getElementById(
        "adminGate"
    );

const adminDashboard =
    document.getElementById(
        "adminDashboard"
    );

const adminGateBackButton =
    document.getElementById(
        "adminGateBackButton"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


/* ========================================
   ELEMENTOS - KPI
======================================== */

const kpiPlayers =
    document.getElementById(
        "kpiPlayers"
    );

const kpiScenarios =
    document.getElementById(
        "kpiScenarios"
    );

const kpiCompromised =
    document.getElementById(
        "kpiCompromised"
    );

const kpiSusceptibility =
    document.getElementById(
        "kpiSusceptibility"
    );


/* ========================================
   ELEMENTOS - TABLA
======================================== */

const compromisedTableBody =
    document.getElementById(
        "compromisedTableBody"
    );

const tableEmptyMessage =
    document.getElementById(
        "tableEmptyMessage"
    );

const tablePagination =
    document.getElementById(
        "tablePagination"
    );

const categoriesLegend =
    document.getElementById(
        "categoriesLegend"
    );

const backButton =
    document.getElementById(
        "backButton"
    );


/* ========================================
   NOMBRES Y COLORES POR TÉCNICA

   Mismos tipos usados en ads.js
   y statistics.js, para que las
   etiquetas coincidan en todo
   el proyecto.
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


const attackColors = {

    phishing:
        "#d5b95f",

    smishing:
        "#c98a4b",

    quishing:
        "#4a9b8e",

    vishing:
        "#a15c56",

    spear_phishing:
        "#8fa66b",

    clone_phishing:
        "#8b7bb0"

};


const RESULT_COLOR_SUCCESS =
    "#5a8255";

const RESULT_COLOR_DANGER =
    "#b4463c";


/* ========================================
   ACCESO DE ADMINISTRADOR
======================================== */

/* ========================================
   ACCESO DE ADMINISTRADOR
======================================== */

function checkAdminAccess() {

    if (
        isAdminUser()
    ) {

        adminDashboard.classList.remove(
            "hidden"
        );

        initializeAdminPanel();

    }

    else {

        adminGate.classList.remove(
            "hidden"
        );

        adminDashboard.classList.add(
            "hidden"
        );

    }

}


adminGateBackButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "map.html";

    }
);


logoutButton.addEventListener(
    "click",
    function () {

        logoutSession();

    }
);


backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "map.html";

    }
);


/* ========================================
   OBTENER DATOS

   TEMPORAL: se leen de localStorage.

   Cuando exista el API, esta es la
   única función que debería cambiar
   (reemplazar por un fetch al backend).
======================================== */

function getSecurityResults() {

    return JSON.parse(
        localStorage.getItem(
            "mayaSecurityResults"
        ) || "[]"
    );

}


/* ========================================
   RESUMEN GENERAL (KPI)
======================================== */

function calculateGlobalSummary(
    results
) {

    const players =
        new Set(
            results.map(
                result => result.player
            )
        );


    const total =
        results.length;


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
                compromised / total
            ) * 100;

    }


    return {

        totalPlayers:
            players.size,

        total,
        compromised,
        percentage

    };

}


function renderKPIs(
    summary
) {

    kpiPlayers.textContent =
        summary.totalPlayers;

    kpiScenarios.textContent =
        summary.total;

    kpiCompromised.textContent =
        summary.compromised;

    kpiSusceptibility.textContent =
        `${summary.percentage.toFixed(1)}%`;

}


/* ========================================
   GRÁFICA: RESULTADOS POR TÉCNICA
======================================== */

let techniquesChartInstance =
    null;


function renderTechniquesChart(
    results
) {

    const types =
        Object.keys(
            attackNames
        );


    const detectedData =
        types.map(
            function (type) {

                return results.filter(
                    result =>
                        result.type === type &&
                        result.result === "detected"
                ).length;

            }
        );


    const compromisedData =
        types.map(
            function (type) {

                return results.filter(
                    result =>
                        result.type === type &&
                        result.result === "compromised"
                ).length;

            }
        );


    const labels =
        types.map(
            type => attackNames[type]
        );


    const canvas =
        document.getElementById(
            "techniquesChart"
        );


    if (
        techniquesChartInstance
    ) {

        techniquesChartInstance.destroy();

    }


    techniquesChartInstance =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels: labels,

                    datasets: [

                        {
                            label: "Detectado",
                            data: detectedData,
                            backgroundColor: RESULT_COLOR_SUCCESS,
                            borderRadius: 4
                        },

                        {
                            label: "Comprometido",
                            data: compromisedData,
                            backgroundColor: RESULT_COLOR_DANGER,
                            borderRadius: 4
                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        x: {

                            ticks: {
                                color: "#c7c7b5",
                                font: { size: 11 }
                            },

                            grid: {
                                color: "rgba(255,255,255,0.06)"
                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {
                                color: "#c7c7b5",
                                precision: 0
                            },

                            grid: {
                                color: "rgba(255,255,255,0.06)"
                            }

                        }

                    },

                    plugins: {

                        legend: {
                            labels: { color: "#e5dfcf" }
                        }

                    }

                }

            }
        );

}


/* ========================================
   GRÁFICA: TÉCNICAS MÁS FRECUENTES
======================================== */

let categoriesChartInstance =
    null;


function renderCategoriesChart(
    results
) {

    const types =
        Object.keys(
            attackNames
        );


    const counts =
        types.map(
            function (type) {

                return results.filter(
                    result => result.type === type
                ).length;

            }
        );


    const colors =
        types.map(
            type => attackColors[type]
        );


    const canvas =
        document.getElementById(
            "categoriesChart"
        );


    if (
        categoriesChartInstance
    ) {

        categoriesChartInstance.destroy();

    }


    categoriesChartInstance =
        new Chart(
            canvas,
            {

                type: "doughnut",

                data: {

                    labels: types.map(
                        type => attackNames[type]
                    ),

                    datasets: [

                        {
                            data: counts,
                            backgroundColor: colors,
                            borderColor: "#1c231b",
                            borderWidth: 2
                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "62%",

                    plugins: {

                        legend: {
                            display: false
                        }

                    }

                }

            }
        );


    renderCategoriesLegend(
        types,
        colors
    );

}


function renderCategoriesLegend(
    types,
    colors
) {

    categoriesLegend.innerHTML =
        "";


    types.forEach(
        function (type, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.innerHTML = `
                <span style="background:${colors[index]}"></span>
                ${attackNames[type]}
            `;


            categoriesLegend.appendChild(
                item
            );

        }
    );

}


/* ========================================
   FORMATO DE FECHA
======================================== */

const MONTH_NAMES = [
    "ene", "feb", "mar", "abr",
    "may", "jun", "jul", "ago",
    "sep", "oct", "nov", "dic"
];


function formatDate(
    isoString
) {

    if (
        !isoString
    ) {

        return "—";

    }


    const date =
        new Date(
            isoString
        );


    const day =
        date.getDate();

    const month =
        MONTH_NAMES[
            date.getMonth()
        ];

    const year =
        date.getFullYear();

    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    return `${day} ${month} ${year}, ${hours}:${minutes}`;

}


/* ========================================
   TABLA DE INTERACCIONES RIESGOSAS
======================================== */

let compromisedResultsCache =
    [];


function buildCompromisedList(
    results
) {

    return results
        .filter(
            result =>
                result.result === "compromised"
        )
        .sort(
            function (a, b) {

                return (
                    new Date(b.timestamp) -
                    new Date(a.timestamp)
                );

            }
        );

}


function renderCompromisedTable() {

    const total =
        compromisedResultsCache.length;


    if (
        total === 0
    ) {

        compromisedTableBody.innerHTML =
            "";

        tableEmptyMessage.classList.remove(
            "hidden"
        );

        tablePagination.innerHTML =
            "";

        return;

    }


    tableEmptyMessage.classList.add(
        "hidden"
    );


    const totalPages =
        Math.ceil(
            total / ROWS_PER_PAGE
        );


    if (
        currentPage > totalPages
    ) {

        currentPage = totalPages;

    }


    const start =
        (currentPage - 1) * ROWS_PER_PAGE;

    const pageItems =
        compromisedResultsCache.slice(
            start,
            start + ROWS_PER_PAGE
        );


    compromisedTableBody.innerHTML =
        "";


    pageItems.forEach(
        function (item) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td class="player-cell">
                    ${item.player}
                </td>

                <td>
                    ${formatDate(item.timestamp)}
                </td>

                <td>
                    ${item.location || "No especificada"}
                </td>

                <td>
                    <span class="technique-badge">
                        ${attackNames[item.type] || item.type}
                    </span>
                </td>

                <td>
                    ${item.level ?? "—"}
                </td>

            `;


            compromisedTableBody.appendChild(
                row
            );

        }
    );


    renderPagination(
        totalPages
    );

}


function renderPagination(
    totalPages
) {

    tablePagination.innerHTML =
        "";


    if (
        totalPages <= 1
    ) {

        return;

    }


    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";

        button.textContent =
            page;


        if (
            page === currentPage
        ) {

            button.classList.add(
                "active"
            );

        }


        button.addEventListener(
            "click",
            function () {

                currentPage = page;

                renderCompromisedTable();

            }
        );


        tablePagination.appendChild(
            button
        );

    }

}


/* ========================================
   INICIALIZAR PANEL
======================================== */

function initializeAdminPanel() {

    const results =
        getSecurityResults();


    const summary =
        calculateGlobalSummary(
            results
        );


    renderKPIs(
        summary
    );


    renderTechniquesChart(
        results
    );


    renderCategoriesChart(
        results
    );


    compromisedResultsCache =
        buildCompromisedList(
            results
        );

    currentPage = 1;

    renderCompromisedTable();

}


/* ========================================
   INICIO
======================================== */

checkAdminAccess();
