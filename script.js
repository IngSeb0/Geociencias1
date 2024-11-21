// Variables globales para gráficos
let graficoSimulador;
let graficoAhorro;

// Función para calcular la eficiencia en el simulador
function calcularEficiencia() {
    const profundidad = parseFloat(document.getElementById('profundidad').value);
    const temperatura = parseFloat(document.getElementById('temperatura').value);
    if (temperatura !== 0) {
        const eficiencia = ((profundidad / temperatura) * 10).toFixed(2);
        const resultado = `Con una profundidad de ${profundidad} m y una temperatura de ${temperatura} °C, se estima un ahorro energético del ${eficiencia}%.`;

        document.getElementById('resultado-simulador').innerText = resultado;

        // Crear o actualizar gráfico de eficiencia
        let ctx = document.getElementById('graficoSimulador').getContext('2d');
        if (graficoSimulador) {
            graficoSimulador.data.datasets[0].data = [parseFloat(eficiencia)];
            graficoSimulador.update();
        } else {
            graficoSimulador = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Eficiencia Calculada'],
                    datasets: [{
                        label: 'Eficiencia (%)',
                        data: [parseFloat(eficiencia)],
                        backgroundColor: ['#4CAF50']
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    } else {
        document.getElementById('resultado-simulador').innerText = 'La temperatura no puede ser 0. Por favor, ajústala para calcular la eficiencia.';
    }
}


function calcularAhorro() {
    const consumoActual = parseFloat(document.getElementById('consumo-actual').value);
    const eficienciaSistema = parseFloat(document.getElementById('eficiencia-sistema').value) / 100;
    const costoKwh = parseFloat(document.getElementById('costo-kwh').value);
    const meses = parseInt(document.getElementById('meses').value, 10);

    if (isNaN(consumoActual) || isNaN(eficienciaSistema) || isNaN(costoKwh) || isNaN(meses)) {
        alert("Por favor, llena todos los campos correctamente.");
        return;
    }

    // Calcular ahorro energético y económico
    const ahorroEnergeticoMensual = consumoActual * eficienciaSistema;
    const ahorroEconomicoMensual = ahorroEnergeticoMensual * costoKwh;
    const ahorroTotal = ahorroEconomicoMensual * meses;

    // Mostrar resultados
    document.getElementById('ahorro-energetico').textContent = ahorroEnergeticoMensual.toFixed(2);
    document.getElementById('ahorro-economico').textContent = ahorroEconomicoMensual.toFixed(2);
    document.getElementById('ahorro-total').textContent = ahorroTotal.toFixed(2);
    document.getElementById('informacion-adicional').style.display = "block";

    // Datos para el gráfico
    const ahorroMensualData = Array.from({ length: meses }, (_, i) => ahorroEconomicoMensual * (i + 1));
    const mesesData = Array.from({ length: meses }, (_, i) => i + 1);

    // Crear o actualizar el gráfico
    const ctx = document.getElementById('graficoAhorro').getContext('2d');
    if (graficoAhorro) {
        graficoAhorro.destroy(); // Elimina el gráfico previo si existe
    }
    graficoAhorro = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mesesData,
            datasets: [{
                label: 'Ahorro Acumulado ($)',
                data: ahorroMensualData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ahorro Acumulado ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function cargarInfografiaComparativa() {
    let ctx = document.getElementById('graficoComparativo').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Geotérmica', 'Solar', 'Eólica', 'Hidroeléctrica'],
            datasets: [{
                label: 'Eficiencia (%)',
                data: [90, 75, 80, 85], // Datos representativos
                backgroundColor: ['#4CAF50', '#FFC107', '#36A2EB', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje de Eficiencia'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}



// Función para mostrar detalles de los procesos
function mostrarDetalleProceso(etapa) {
    const detalles = document.querySelectorAll('.detalle');
    detalles.forEach(detalle => detalle.style.display = 'none');

    document.getElementById(`detalle-${etapa}`).style.display = 'block';
}

// Inicializar gráficos de infografías
document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Eficiencia de la Energía Geotérmica
    let ctxEficiencia = document.getElementById('graficoEficienciaGeotermica').getContext('2d');
    new Chart(ctxEficiencia, {
        type: 'bar',
        data: {
            labels: ['Geotérmica', 'Solar', 'Eólica', 'Hidroeléctrica'],
            datasets: [{
                label: 'Eficiencia (%)',
                data: [90, 75, 80, 85],
                backgroundColor: ['#4CAF50', '#FFC107', '#36A2EB', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje de Eficiencia'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    // Gráfico Comparativo de Energías
    let ctxComparativo = document.getElementById('graficoComparativoGeotermico').getContext('2d');
    new Chart(ctxComparativo, {
        type: 'doughnut',
        data: {
            labels: ['Geotérmica', 'Solar', 'Eólica', 'Hidroeléctrica'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: ['#4CAF50', '#FFC107', '#36A2EB', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let fuente = context.label;
                            let porcentaje = context.raw;
                            return `${fuente}: ${porcentaje}% de eficiencia.`;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
},

window.onscroll = function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    document.getElementById("progreso").style.width = scrollPercentage + "%";
})



// Llamar a la función de carga de infografías al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarInfografia();
    actualizarEstadoJuego(); // Mantener la funcionalidad del juego activa
});

// Variables para el juego interactivo
let puntuacion = 0;
let eficiencia = 50;
let presupuesto = 100;
const filas = 5; // Número de filas en el tablero
const columnas = 5; // Número de columnas en el tablero

// Función para generar el tablero de juego
function generarTablero() {
    const tablero = document.getElementById('tablero-juego');
    tablero.innerHTML = ''; // Limpiar tablero existente
    for (let i = 0; i < filas; i++) {
        const fila = document.createElement('div');
        fila.classList.add('fila');
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.innerText = '?';
            celda.onclick = () => explorarCelda(celda, i * columnas + j);
            fila.appendChild(celda);
        }
        tablero.appendChild(fila);
    }
}

// Función del juego interactivo
function explorarCelda(celda, index) {
    if (!celda.classList.contains('activa')) {
        if (presupuesto >= 10) {
            celda.classList.add('activa');
            presupuesto -= 10;
            const resultado = Math.random() < 0.5 ? 'bueno' : 'malo';

            if (resultado === 'bueno') {
                puntuacion += 15;
                eficiencia += 5;
                celda.innerText = '💧';
                celda.style.backgroundColor = '#4CAF50';
                mostrarDesafioEducativo();
            } else {
                puntuacion -= 5;
                eficiencia -= 5;
                celda.innerText = '🔥';
                celda.style.backgroundColor = '#FF5733';
                mostrarEventoAleatorio();
            }

            actualizarEstadoJuego();
        } else {
            alert('No tienes suficiente presupuesto para perforar.');
        }
    }
}

function mostrarDesafioEducativo() {
    const preguntas = [
        {
            pregunta: "¿Cuál es la principal fuente de calor en un sistema geotérmico?",
            opciones: ["El Sol", "El núcleo de la Tierra", "La atmósfera"],
            respuesta: 1
        },
        {
            pregunta: "¿Qué tipo de edificios pueden beneficiarse de la energía geotérmica?",
            opciones: ["Residenciales, comerciales e industriales", "Solo casas pequeñas", "Edificios con paneles solares"],
            respuesta: 0
        },
        {
            pregunta: "¿Cuál es la tecnología clave utilizada en edificios con energía geotérmica?",
            opciones: ["Bombas de calor geotérmicas", "Turbinas eólicas", "Paneles fotovoltaicos"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué impacto tiene la energía geotérmica en la huella de carbono de un edificio?",
            opciones: ["Incrementa las emisiones de CO₂", "Reduce las emisiones de CO₂", "No tiene impacto"],
            respuesta: 1
        },
        {
            pregunta: "¿En qué zonas es más eficiente la energía geotérmica?",
            opciones: ["En zonas volcánicas", "En regiones frías", "En desiertos"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué beneficio tienen las bombas de calor geotérmicas para edificios?",
            opciones: [
                "Reducen el consumo de energía en calefacción y refrigeración",
                "Aumentan el consumo de energía eléctrica",
                "Solo funcionan en climas cálidos"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Cómo se utiliza la energía geotérmica en la arquitectura sostenible?",
            opciones: [
                "Para calefacción, refrigeración y generación de electricidad",
                "Solo para generar electricidad",
                "Para decoración de interiores"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Cuál es un desafío técnico de integrar energía geotérmica en edificios?",
            opciones: [
                "Altos costos iniciales",
                "Alta contaminación del suelo",
                "Elevado consumo de agua potable"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué tipo de suelo es ideal para un sistema geotérmico eficiente?",
            opciones: ["Suelos con alta conductividad térmica", "Arenosos", "Arcillosos"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué profundidad suelen tener los pozos geotérmicos en edificios residenciales?",
            opciones: ["Entre 50 y 150 metros", "Menos de 10 metros", "Más de 500 metros"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué característica hace que la energía geotérmica sea sostenible?",
            opciones: [
                "Es una fuente inagotable y renovable",
                "Emite grandes cantidades de CO₂",
                "Depende del clima"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué tipo de energía es complementaria a la geotérmica en edificios?",
            opciones: ["Solar", "Fósil", "Nuclear"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué porcentaje de ahorro energético puede lograrse con energía geotérmica en edificios?",
            opciones: ["Hasta un 70%", "Un máximo de 20%", "Entre 5% y 10%"],
            respuesta: 0
        },
        {
            pregunta: "¿Cómo se distribuye el calor en edificios con sistemas geotérmicos?",
            opciones: [
                "Mediante bombas de calor y sistemas de tuberías",
                "Por radiación directa",
                "Por ventilación natural"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué impacto tiene la energía geotérmica en el diseño arquitectónico?",
            opciones: [
                "Permite diseños más sostenibles",
                "Aumenta la complejidad del diseño",
                "Limita las opciones de materiales"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Cuál es un uso directo del calor geotérmico en edificios?",
            opciones: ["Calefacción de espacios", "Iluminación", "Energía para ascensores"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué característica hace que los edificios con energía geotérmica sean más confortables?",
            opciones: [
                "Temperatura interior constante todo el año",
                "Mejor aislamiento acústico",
                "Mayor cantidad de luz natural"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué tipo de arquitectura es ideal para la integración de energía geotérmica?",
            opciones: ["Arquitectura sostenible", "Rascacielos de más de 50 pisos", "Edificios históricos"],
            respuesta: 0
        },
        {
            pregunta: "¿Cuál es el principal costo asociado con los sistemas geotérmicos en edificios?",
            opciones: [
                "La instalación inicial",
                "El mantenimiento constante",
                "El costo de energía eléctrica"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Cómo afectan los sistemas geotérmicos al valor de una propiedad?",
            opciones: [
                "Aumentan su valor por ser más sostenibles",
                "Reducen su valor por los costos de instalación",
                "No tienen impacto en el valor de la propiedad"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué sucede con el calor residual en sistemas geotérmicos eficientes?",
            opciones: [
                "Se reutiliza para calefacción directa",
                "Se libera al medio ambiente",
                "Se almacena en paneles solares"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué tipo de edificios tienen mayor potencial de ahorro con energía geotérmica?",
            opciones: ["Edificios comerciales y residenciales grandes", "Casas pequeñas", "Fábricas aisladas"],
            respuesta: 0
        },
        {
            pregunta: "¿Qué regulación promueve el uso de energía geotérmica en edificios?",
            opciones: [
                "Normas de eficiencia energética",
                "Leyes de urbanismo",
                "Reglamentos de seguridad eléctrica"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué impacto tiene la energía geotérmica en la calidad del aire interior?",
            opciones: [
                "Mejora la calidad del aire al no producir emisiones",
                "No tiene impacto",
                "Reduce la calidad del aire por los gases liberados"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Cómo ayuda la energía geotérmica a cumplir los objetivos de desarrollo sostenible?",
            opciones: [
                "Promueve energía limpia y accesible",
                "Genera residuos que deben gestionarse",
                "Depende de combustibles fósiles complementarios"
            ],
            respuesta: 0
        }
    ];
    

    const desafio = preguntas[Math.floor(Math.random() * preguntas.length)];
    const respuesta = prompt(`${desafio.pregunta}\nOpciones:\n${desafio.opciones.map((op, i) => `${i + 1}. ${op}`).join('\n')}`);

    if (parseInt(respuesta) - 1 === desafio.respuesta) {
        alert("¡Respuesta correcta! Ganas 10 puntos de eficiencia y 20 de presupuesto.");
        eficiencia += 10;
        presupuesto += 20;
    } else {
        alert("Respuesta incorrecta. Pierdes 5 puntos de eficiencia.");
        eficiencia -= 5;
    }
}

function mostrarEventoAleatorio() {
    const eventos = [
        "Mantenimiento inesperado: pierdes 10 de presupuesto.",
        "Descubres una nueva fuente de calor: ganas 10 de eficiencia.",
        "Problemas técnicos: pierdes 5 de eficiencia.",
        "Condiciones climáticas adversas: eficiencia reducida en 10%.",
        "Reducción de impuestos: presupuesto aumentado en 20.",
        "Integración exitosa de geotermia en un edificio: ganas 15 puntos de eficiencia.",
        "Un cliente contrata sistemas geotérmicos para su edificio: presupuesto aumentado en 30.",
        "Desafíos regulatorios: pierdes 15 de presupuesto.",
        "Innovación en bombas de calor: eficiencia aumentada en 20.",
        "Mayor adopción de arquitectura sostenible: ganas 10 de eficiencia."
    ];

    const evento = eventos[Math.floor(Math.random() * eventos.length)];
    alert(evento);

    if (evento.includes("pierdes 10 de presupuesto")) {
        presupuesto -= 10;
    } else if (evento.includes("ganas 10 de eficiencia")) {
        eficiencia += 10;
    } else if (evento.includes("pierdes 5 de eficiencia")) {
        eficiencia -= 5;
    } else if (evento.includes("eficiencia reducida en 10%")) {
        eficiencia -= 10;
    } else if (evento.includes("presupuesto aumentado en 20")) {
        presupuesto += 20;
    } else if (evento.includes("ganas 15 puntos de eficiencia")) {
        eficiencia += 15;
    } else if (evento.includes("presupuesto aumentado en 30")) {
        presupuesto += 30;
    } else if (evento.includes("pierdes 15 de presupuesto")) {
        presupuesto -= 15;
    } else if (evento.includes("eficiencia aumentada en 20")) {
        eficiencia += 20;
    }
}


function actualizarEstadoJuego() {
    document.getElementById('estado-juego').innerText = `Puntuación: ${puntuacion} | Eficiencia: ${eficiencia}% | Presupuesto: $${presupuesto}`;

    if (eficiencia <= 0) {
        alert('¡La planta se ha vuelto ineficiente y ha fallado! Intenta de nuevo.');
        reiniciarJuego();
    } else if (presupuesto <= 0) {
        alert('¡Te has quedado sin presupuesto! Intenta de nuevo.');
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    puntuacion = 0;
    eficiencia = 50;
    presupuesto = 100;
    generarTablero();
    actualizarEstadoJuego();
}

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generarTablero();
    actualizarEstadoJuego();
});