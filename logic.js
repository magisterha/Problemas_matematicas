/**
 * Lógica del Profesor de Matemáticas
 * Este script espera que exista una variable global llamada 'problemSet'
 * cargada desde otro archivo JS antes que este.
 */

let currentProblemIndex = 0;
let score = 0;

// Elementos del DOM
const problemDisplay = document.getElementById('display-operation');
const answerInput = document.getElementById('user-answer');
const feedbackDisplay = document.getElementById('feedback');
const checkButton = document.getElementById('btn-check');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    if (typeof problemSet === 'undefined') {
        problemDisplay.innerText = "Error: No se han cargado los datos.";
        return;
    }
    loadProblem();
});

// Cargar problema actual
function loadProblem() {
    // Limpiar interfaz
    answerInput.value = '';
    feedbackDisplay.innerText = '';
    feedbackDisplay.className = '';
    answerInput.focus();

    // Verificar si terminamos
    if (currentProblemIndex >= problemSet.length) {
        finishSession();
        return;
    }

    // Mostrar problema
    const current = problemSet[currentProblemIndex];
    problemDisplay.innerText = current.question;
    
    // Configurar botón
    checkButton.innerText = "Comprobar Respuesta";
    checkButton.onclick = checkAnswer;
}

// Verificar respuesta
function checkAnswer() {
    const userVal = parseFloat(answerInput.value);
    const correctVal = problemSet[currentProblemIndex].answer;

    if (isNaN(userVal)) {
        feedbackDisplay.innerText = "Por favor, escribe un número.";
        return;
    }

    if (userVal === correctVal) {
        feedbackDisplay.innerText = "¡Correcto! Excelente trabajo.";
        feedbackDisplay.className = "correct";
        score++;
        
        // Esperar un momento y pasar al siguiente
        setTimeout(() => {
            currentProblemIndex++;
            loadProblem();
        }, 1500);
    } else {
        feedbackDisplay.innerText = "Incorrecto. Inténtalo de nuevo.";
        feedbackDisplay.className = "incorrect";
        // Aquí decidimos si le dejamos reintentar o pasamos. 
        // Como profesor, prefiero que lo piensen de nuevo, no avanzo el índice.
    }
}

function finishSession() {
    problemDisplay.innerText = "¡Clase terminada!";
    answerInput.style.display = 'none';
    checkButton.innerText = "Volver al Menú";
    checkButton.onclick = () => window.location.href = '../index.html';
    
    const percentage = Math.round((score / problemSet.length) * 100);
    feedbackDisplay.innerHTML = `Puntuación Final: ${score}/${problemSet.length}<br>Nota: ${percentage}%`;
}

// Permitir usar la tecla Enter
answerInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
