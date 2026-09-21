/* ========================================
   EL MISTERIO MAYA
   SISTEMA DE ESCENARIOS DE SEGURIDAD
======================================== */


/*
    Tiempo mínimo entre escenarios.

    Para pruebas:
    5 minutos.

    Más adelante podemos modificarlo.
*/
const AD_INTERVAL =
    5 * 60 * 1000;


/*
    Último escenario mostrado.
*/
let lastAdTime = 0;


/* ========================================
   ESCENARIOS
======================================== */

const securityScenarios = [

    /* ====================================
       PHISHING
    ==================================== */

    {
        id: "PHISHING_01",
        type: "phishing",
        difficulty: "Fácil",
        icon: "🔐",

        title:
            "ACTIVIDAD INUSUAL DETECTADA",

        message:
            "Hemos detectado un inicio de sesión inusual en tu cuenta. Para evitar la suspensión, debes verificar tu identidad inmediatamente. Este enlace expira en 10 minutos.",

        action:
            "VERIFICAR MI CUENTA",

        recommendation:
            "Desconfía de mensajes que generen urgencia y soliciten verificar tu cuenta mediante un enlace."
    },


    {
        id: "PHISHING_02",
        type: "phishing",
        difficulty: "Media",
        icon: "📄",

        title:
            "FACTURA PENDIENTE DE PAGO",

        message:
            "Hemos detectado una factura pendiente asociada a tu cuenta. Para evitar cargos adicionales, revisa el documento antes de la fecha límite.",

        action:
            "CONSULTAR FACTURA",

        recommendation:
            "Si recibes una factura inesperada, verifica directamente con el servicio correspondiente antes de abrir enlaces o documentos."
    },


    {
        id: "PHISHING_03",
        type: "phishing",
        difficulty: "Media",
        icon: "🎁",

        title:
            "¡FELICIDADES!",

        message:
            "Has sido seleccionado para recibir una recompensa especial. Reclama tu premio antes de que expire la promoción.",

        action:
            "RECLAMAR PREMIO",

        recommendation:
            "Desconfía de premios o recompensas que no esperabas recibir, especialmente cuando te presionan para actuar rápidamente."
    },


    /* ====================================
       SMISHING
    ==================================== */

    {
        id: "SMISHING_01",
        type: "smishing",
        difficulty: "Fácil",
        icon: "📦",

        title:
            "PAQUETE NO ENTREGADO",

        message:
            "No pudimos entregar tu paquete debido a un problema con la dirección registrada. Actualiza tus datos para programar una nueva entrega. Debes hacerlo dentro de las próximas 2 horas.",

        action:
            "ACTUALIZAR DIRECCIÓN",

        recommendation:
            "No utilices enlaces recibidos por SMS para resolver problemas de entregas. Verifica el envío mediante canales oficiales."
    },


    {
        id: "SMISHING_02",
        type: "smishing",
        difficulty: "Media",
        icon: "🔐",

        title:
            "ALERTA DE SEGURIDAD",

        message:
            "Se detectó un intento de acceso a tu cuenta desde un dispositivo desconocido. Si no reconoces esta actividad, confirma inmediatamente para proteger tu cuenta.",

        action:
            "CONFIRMAR ACTIVIDAD",

        recommendation:
            "Ante una alerta inesperada, accede directamente a la aplicación o sitio oficial en lugar de utilizar enlaces recibidos por SMS."
    },


    {
        id: "SMISHING_03",
        type: "smishing",
        difficulty: "Media",
        icon: "🩺",

        title:
            "NUEVO MÉTODO PARA MEDIR TU AZÚCAR",

        message:
            "¿Sabías que ya no necesitas utilizar un glucómetro? Descarga nuestra aplicación gratuita y mide tu nivel de azúcar colocando tu dedo sobre la pantalla.",

        action:
            "DESCARGAR APLICACIÓN",

        recommendation:
            "Desconfía de aplicaciones que prometan realizar funciones que normalmente requieren dispositivos especializados, especialmente si llegan mediante mensajes inesperados."
    },


    /* ====================================
       QUISHING
    ==================================== */

    {
        id: "QUISHING_01",
        type: "quishing",
        difficulty: "Fácil",
        icon: "📷",

        title:
            "¡HAS SIDO SELECCIONADO!",

        message:
            "Participa para recibir una recompensa especial. Escanea el código QR para conocer tu premio. Promoción disponible por tiempo limitado.",

        action:
            "ESCANEAR CÓDIGO QR",

        recommendation:
            "No confíes automáticamente en un QR solo porque aparece en una promoción. Verifica su origen antes de escanearlo."
    },


    {
        id: "QUISHING_02",
        type: "quishing",
        difficulty: "Media",
        icon: "🚗",

        title:
            "PAGO DE ESTACIONAMIENTO",

        message:
            "Tu tiempo de estacionamiento está próximo a vencer. Evita una penalización realizando el pago mediante el siguiente código. Tiempo restante: 15 minutos.",

        action:
            "ESCANEAR QR PARA PAGAR",

        recommendation:
            "Antes de realizar un pago mediante QR, confirma que pertenece al establecimiento o servicio correspondiente."
    },


    /* ====================================
       VISHING
    ==================================== */

    {
        id: "VISHING_01",
        type: "vishing",
        difficulty: "Media",
        icon: "📞",

        title:
            "LLAMADA DEL DEPARTAMENTO DE SEGURIDAD",

        message:
            "Hemos detectado actividad sospechosa en tu cuenta. Un representante necesita verificar tu identidad para evitar el bloqueo.",

        action:
            "CONTESTAR LLAMADA",

        recommendation:
            "Ante una llamada sospechosa, finaliza la comunicación y contacta directamente con la institución mediante un número oficial."
    },


    {
        id: "VISHING_02",
        type: "vishing",
        difficulty: "Media",
        icon: "💻",

        title:
            "SOPORTE TÉCNICO",

        message:
            "Hemos detectado un problema de seguridad en tu dispositivo. Para solucionar el problema necesitamos que instales una herramienta de asistencia remota.",

        action:
            "INSTALAR HERRAMIENTA",

        recommendation:
            "No instales herramientas de acceso remoto siguiendo instrucciones de llamadas inesperadas. Contacta directamente al soporte oficial."
    },


    /* ====================================
       SPEAR PHISHING
    ==================================== */

    {
        id: "SPEAR_01",
        type: "spear_phishing",
        difficulty: "Media",
        icon: "👤",

        title:
            "MENSAJE PERSONALIZADO",

        message:
            "Hola, {PLAYER}. Necesitamos que revises una información relacionada con tu cuenta. Para completar el proceso, ingresa al siguiente enlace.",

        action:
            "REVISAR INFORMACIÓN",

        recommendation:
            "Que un mensaje utilice tu nombre no significa que sea legítimo. Verifica siempre el remitente y el enlace."
    },


    {
        id: "SPEAR_02",
        type: "spear_phishing",
        difficulty: "Media",
        icon: "🎓",

        title:
            "NOTIFICACIÓN ACADÉMICA",

        message:
            "Hola, {PLAYER}. Se ha generado un documento relacionado con tu actividad académica. Puedes consultarlo desde el siguiente enlace.",

        action:
            "VER DOCUMENTO",

        recommendation:
            "Aunque el mensaje parezca relacionado con tus actividades habituales, verifica el remitente y utiliza las plataformas oficiales."
    },


    {
        id: "SPEAR_03",
        type: "spear_phishing",
        difficulty: "Difícil",
        icon: "📋",

        title:
            "DOCUMENTO DEL PROYECTO",

        message:
            "Hola {PLAYER}. Estoy terminando la documentación del proyecto y necesito que revises este archivo antes de enviarlo.",

        action:
            "ABRIR DOCUMENTO",

        recommendation:
            "Si recibes un archivo o enlace inesperado de un compañero, confirma la solicitud por otro medio antes de abrirlo."
    },


    /* ====================================
       CLONE PHISHING
    ==================================== */

    {
        id: "CLONE_01",
        type: "clone_phishing",
        difficulty: "Media",
        icon: "📄",

        title:
            "DOCUMENTO COMPARTIDO",

        message:
            "Se ha compartido un documento contigo. Nombre: Informe_Importante.pdf. El documento está disponible para su revisión.",

        action:
            "ABRIR DOCUMENTO",

        recommendation:
            "Aunque un mensaje parezca familiar, revisa cuidadosamente el remitente y el destino del enlace antes de abrir documentos."
    },


    {
        id: "CLONE_02",
        type: "clone_phishing",
        difficulty: "Difícil",
        icon: "📩",

        title:
            "CONFIRMACIÓN DE SOLICITUD",

        message:
            "Tu solicitud ha sido procesada correctamente. Para consultar los detalles y confirmar la información registrada, utiliza el siguiente enlace.",

        action:
            "VER DETALLES",

        recommendation:
            "Si recibes una confirmación de una actividad que no reconoces, verifica directamente desde el servicio correspondiente."
    }

];


/* ========================================
   ELEMENTOS DEL ESCENARIO
======================================== */

const adOverlay =
    document.getElementById(
        "adOverlay"
    );

const scenarioLabel =
    document.getElementById(
        "scenarioLabel"
    );

const scenarioIcon =
    document.getElementById(
        "scenarioIcon"
    );

const scenarioTitle =
    document.getElementById(
        "scenarioTitle"
    );

const scenarioMessage =
    document.getElementById(
        "scenarioMessage"
    );

const scenarioAction =
    document.getElementById(
        "scenarioAction"
    );

const scenarioSafeButton =
    document.getElementById(
        "scenarioSafeButton"
    );

const scenarioResult =
    document.getElementById(
        "scenarioResult"
    );

const scenarioRecommendation =
    document.getElementById(
        "scenarioRecommendation"
    );

const adCountdown =
    document.getElementById(
        "adCountdown"
    );

const adCloseButton =
    document.getElementById(
        "adCloseButton"
    );


/* ========================================
   OBTENER NOMBRE DEL JUGADOR
======================================== */

function getScenarioPlayerName() {

    return (
        localStorage.getItem(
            "mayaPlayer"
        ) || "Jugador"
    );

}


/* ========================================
   OBTENER ESCENARIO
======================================== */

function getRandomScenario() {

    /*
        Obtener escenarios ya utilizados.
    */

    const used =
        JSON.parse(
            localStorage.getItem(
                "mayaUsedScenarios"
            ) || "[]"
        );


    /*
        Buscar escenarios
        que todavía no hayan aparecido.
    */

    let available =
        securityScenarios.filter(
            scenario =>
                !used.includes(
                    scenario.id
                )
        );


    /*
        Si ya se utilizaron
        todos, comenzamos nuevamente.
    */

    if (
        available.length === 0
    ) {

        localStorage.removeItem(
            "mayaUsedScenarios"
        );

        available =
            securityScenarios;

    }


    /*
        Seleccionar uno aleatoriamente.
    */

    const index =
        Math.floor(
            Math.random() *
            available.length
        );


    const selected =
        available[index];


    /*
        Guardar como utilizado.
    */

    used.push(
        selected.id
    );


    localStorage.setItem(
        "mayaUsedScenarios",
        JSON.stringify(
            used
        )
    );


    return selected;

}


/* ========================================
   GUARDAR RESULTADO
======================================== */

function saveScenarioResult(
    scenario,
    result
) {

    const player =
        getScenarioPlayerName();


    /*
        Ubicación ingresada
        por el jugador en el login.
    */

    const location =
        localStorage.getItem(
            "mayaPlayerLocation"
        ) || "No especificada";


    const results =
        JSON.parse(
            localStorage.getItem(
                "mayaSecurityResults"
            ) || "[]"
        );


    results.push({

        player:
            player,

        location:
            location,

        scenario:
            scenario.id,

        type:
            scenario.type,

        difficulty:
            scenario.difficulty,

        result:
            result,

        level:
            typeof currentLevel !==
            "undefined"
                ? currentLevel
                : null,

        timestamp:
            new Date().toISOString()

    });


    localStorage.setItem(
        "mayaSecurityResults",
        JSON.stringify(
            results
        )
    );

}


/* ========================================
   MOSTRAR RESULTADO
======================================== */

function showScenarioResult(
    scenario,
    result
) {

    /*
        Ocultar botones
        de interacción.
    */

    scenarioAction.classList.add(
        "hidden"
    );

    scenarioSafeButton.classList.add(
        "hidden"
    );


    /*
        Resultado.
    */

    if (
        result ===
        "compromised"
    ) {

        scenarioResult.textContent =
            "⚠️ HAS INTERACTUADO CON UNA SITUACIÓN SOSPECHOSA";

        scenarioResult.className =
            "scenario-result danger";

    }

    else {

        scenarioResult.textContent =
            "✅ ¡BIEN DETECTADO!";

        scenarioResult.className =
            "scenario-result success";

    }


    /*
        Recomendación.
    */

    scenarioRecommendation.innerHTML =
        `<strong>💡 Recomendación:</strong><br>${scenario.recommendation}`;

    scenarioRecommendation.classList.remove(
        "hidden"
    );


    /*
        Mostrar botón continuar.
    */

    adCloseButton.classList.remove(
        "hidden"
    );

}


/* ========================================
   MOSTRAR ESCENARIO
======================================== */

function showAd() {

    return new Promise(
        function(resolve) {

            if (
                !adOverlay
            ) {

                resolve();

                return;

            }


            /*
                Seleccionar escenario.
            */

            const scenario =
                getRandomScenario();


            /*
                Reemplazar nombre
                del jugador.
            */

            const player =
                getScenarioPlayerName();


            const message =
                scenario.message.replace(
                    "{PLAYER}",
                    player
                );


            /*
                Cargar información.
            */

            scenarioLabel.textContent =
                `${scenario.type.toUpperCase()} • ${scenario.difficulty}`;

            scenarioIcon.textContent =
                scenario.icon;

            scenarioTitle.textContent =
                scenario.title;

            scenarioMessage.textContent =
                message;

            scenarioAction.textContent =
                scenario.action;


            /*
                Reiniciar interfaz.
            */

            scenarioResult.classList.add(
                "hidden"
            );

            scenarioRecommendation.classList.add(
                "hidden"
            );

            adCloseButton.classList.add(
                "hidden"
            );

            adCountdown.classList.add(
                "hidden"
            );

            scenarioAction.classList.remove(
                "hidden"
            );

            scenarioSafeButton.classList.remove(
                "hidden"
            );


            /*
                Mostrar escenario.
            */

            adOverlay.classList.remove(
                "hidden"
            );


            lastAdTime =
                Date.now();


            /*
                Interacción riesgosa.
            */

            scenarioAction.onclick =
                function() {

                    saveScenarioResult(
                        scenario,
                        "compromised"
                    );

                    showScenarioResult(
                        scenario,
                        "compromised"
                    );

                };


            /*
                Acción segura.
            */

            scenarioSafeButton.onclick =
                function() {

                    saveScenarioResult(
                        scenario,
                        "detected"
                    );

                    showScenarioResult(
                        scenario,
                        "detected"
                    );

                };


            /*
                Continuar.
            */

            adCloseButton.onclick =
                function() {

                    adOverlay.classList.add(
                        "hidden"
                    );

                    resolve();

                };

        }
    );

}


/* ========================================
   COMPROBAR SI PUEDE MOSTRAR
======================================== */

function canShowAd() {

    const now =
        Date.now();


    return (
        now - lastAdTime >=
        AD_INTERVAL
    );

}


/* ========================================
   ESCENARIO DESPUÉS DEL NIVEL
======================================== */

function showAdAfterLevel() {

    /*
        Para la presentación
        mostramos el escenario
        después de cada nivel.

        Si posteriormente quieres
        volver a utilizar un intervalo
        de tiempo, podemos activar
        canShowAd().
    */

    return showAd();

}