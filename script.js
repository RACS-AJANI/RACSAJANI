// Obtener los elementos <select> por su ID
const tipoReporteSelect = document.getElementById('tipoReporteSelect');
const actoCondicionSelect = document.getElementById('actoCondicionSelect');

// --- Listas de opciones ---

const opcionesReporte = [
    "Comportamiento Inseguro",
    "Condición Insegura",
    "Incidente sin Lesión",
    "Observación de Tarea"
];

const actosSubEstandar = [
    "A-1: Operar equipo sin autorización o entrenamiento",
    "A-2: Omisión o falla al advertir, avisar, comunicar o coordinar",
    "A-3: Omisión o falla al asegurar",
    "A-4: Operar/conducir a velocidad excesiva",
    "A-5: Retirar y/o eliminar sistemas, dispositivos y/o medidas de protección",
    "A-6: Usar equipos y/o herramientas defectuosos o inadecuados",
    "A-7: No usar o utilizar inadecuadamente el equipo de protección personal",
    "A-8: Colocación y/o almacenamiento inadecuado",
    "A-9: Adoptar posición inadecuada para hacer una tarea",
    "A-10: Manipulación inadecuada de cargas",
    "A-11: Revisar el equipo en funcionamiento (mientras se encuentre operando)",
    "A-12: Comportamiento inapropiado del trabajador (bromas, jugueteos, etc.)",
    "A-13: Trabajar bajo la influencia de alcohol y/u otra droga",
    "A-14: Uso inadecuado de equipos y herramientas",
    "A-15: No obedecer señales de seguridad y/o de tránsito",
    "A-16: No cumplir con la política, estándares y procedimientos establecidos.",
    "A-17: Manipulación inadecuada de productos químicos y/o materiales peligrosos",
    "A-18: Personas expuestas a riesgo de caída",
    "A-19: Ingreso a áreas restringidas sin autorización",
    "A-20: Distracciones",
    "A-21: Trabajar en área con falta de orden y limpieza",
    "A-22: No señalizar o restringir un área adecuadamente",
    "A-23: Inadecuada y/o falta de evaluación del riesgo",
    "A-24: Otros"
];

const condicionesSubEstandar = [
    "C-1: Falta o inadecuadas barreras, guardas, muros, barricadas, etc",
    "C-2: Equipo de protección personal inadecuados o insuficientes",
    "C-3: Herramientas, equipos o materiales defectuosos y/o inadecuados",
    "C-4: Área de trabajo congestionada o restringida",
    "C-5: Advertencia y/o señalización insuficientes o inadecuadas",
    "C-6: Riesgo de explosión y/o incendio",
    "C-7: Falta de orden y limpieza",
    "C-8: Presencia de: polvos/humo/gases/asfixia",
    "C-9: Falta de bloqueo y rotulación",
    "C-10: Área con exposición a temperaturas extremas (bajas o altas)",
    "C-11: Excesiva / deficiente iluminación",
    "C-12: Objeto o partes cortantes expuestos",
    "C-13: Condiciones climáticas adversas (lluvia, nieve, helada, neblina, tormentas, etc.)",
    "C-14: Almacenamiento inadecuado de materiales o productos químicos",
    "C-15: Paredes, tejados, etc. Inestables",
    "C-16: Caminos, accesos, pisos y superficies inadecuados o sin mantenimiento",
    "C-17: Instrucciones y/o procedimientos inadecuados",
    "C-18: Falta / falla en comunicaciones",
    "C-19: Riesgo de derrumbe, deslizamiento.",
    "C-20: Falta de ventilación",
    "C-21: Falta / falla de extintores, mangueras contra incendios, otros.",
    "C-22: Tiros cortados",
    "C-23: Riesgo de caída de material / objetos",
    "C-24: Otros"
];

function llenarComboBox(element, lista) {
    const opcionInicial = document.createElement('option');
    opcionInicial.textContent = "Selecciona una opción";
    opcionInicial.value = "";
    opcionInicial.disabled = true;
    opcionInicial.selected = true;
    element.appendChild(opcionInicial);

    lista.forEach(opcionTexto => {
        const opcion = document.createElement('option');
        opcion.textContent = opcionTexto;
        opcion.value = opcionTexto;
        element.appendChild(opcion);
    });
}

llenarComboBox(tipoReporteSelect, opcionesReporte);
llenarComboBox(actoCondicionSelect, [...actosSubEstandar, ...condicionesSubEstandar]);