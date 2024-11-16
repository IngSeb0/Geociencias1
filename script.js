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
            // Actualizar el gráfico existente
            graficoSimulador.data.datasets[0].data = [parseFloat(eficiencia)];
            graficoSimulador.update();
        } else {
            // Crear un nuevo gráfico si no existe
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

// Función para calcular el ahorro en la calculadora
function calcularAhorro() {
    const consumoActual = parseFloat(document.getElementById('consumo-actual').value);

    if (!isNaN(consumoActual) && consumoActual > 0) {
        const ahorro = (consumoActual * 0.3).toFixed(2);
        document.getElementById('resultado-calculadora').innerText = `Podrías ahorrar aproximadamente ${ahorro} kWh al año con un sistema geotermal.`;

        // Crear o actualizar gráfico de ahorro
        let ctx = document.getElementById('graficoAhorro').getContext('2d');
        if (graficoAhorro) {
            // Actualizar el gráfico existente
            graficoAhorro.data.datasets[0].data = [consumoActual, ahorro];
            graficoAhorro.update();
        } else {
            // Crear un nuevo gráfico si no existe
            graficoAhorro = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Consumo Actual', 'Ahorro Estimado'],
                    datasets: [{
                        data: [consumoActual, ahorro],
                        backgroundColor: ['#FFC107', '#4CAF50']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    } else {
        alert('Por favor, ingresa un valor válido para tu consumo actual.');
    }
}

// Función para mostrar gráficos interactivos en la sección de Infografías
function cargarInfografia() {
    let ctx = document.createElement('canvas');
    ctx.id = 'graficoInfografico';
    document.querySelector('.infografia').appendChild(ctx);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Geotérmica', 'Solar', 'Eólica', 'Hidroeléctrica'],
            datasets: [{
                data: [30, 25, 20, 25], // Datos representativos de eficiencia
                backgroundColor: ['#4CAF50', '#FFC107', '#36A2EB', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

// Llamar a la función de carga de infografías al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarInfografia();
    actualizarEstadoJuego(); // Mantener la funcionalidad del juego activa
});

// Variables para el juego interactivo
let puntuacion = 0;
let eficiencia = 50;
let presupuesto = 100;

document.addEventListener('DOMContentLoaded', function() {
    // Crear el tablero de juego
    const tablero = document.getElementById('tablero-juego');
    for (let i = 0; i < 25; i++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        celda.innerText = '?';
        celda.addEventListener('click', () => explorarCelda(celda, i));
        tablero.appendChild(celda);
    }

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
                pregunta: "¿Cuál es una ventaja de la energía geotérmica?",
                opciones: ["Es costosa", "Es inagotable", "Emite mucho CO2"],
                respuesta: 1
            },
            {
                pregunta: "¿Dónde se encuentran los recursos geotérmicos más accesibles?",
                opciones: ["En zonas volcánicas", "En desiertos", "En la tundra"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué tipo de sistema de calefacción es más eficiente con energía geotérmica?",
                opciones: ["Radiadores tradicionales", "Suelo radiante", "Calefacción por aire caliente"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué impacto tienen los sistemas geotérmicos en la huella de carbono?",
                opciones: ["Aumentan la huella de carbono", "No tienen ningún impacto", "Reducen la huella de carbono"],
                respuesta: 2
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
            "Reducción de impuestos: presupuesto aumentado en 20."
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
        document.querySelectorAll('.celda').forEach(celda => {
            celda.classList.remove('activa');
            celda.innerText = '?';
            celda.style.backgroundColor = '#f1f1f1';
        });
        actualizarEstadoJuego();
    }

    actualizarEstadoJuego();
});
