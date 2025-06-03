let num1, num2, solucion, score, maxScore = 0, estado, op;
let dificultad,maxSuma,maxMult, tiempoMas;
const operaciones = ["+", "+", "+", "-", "-", "-", "×", "/"];

let tiempoMax;
let tiempoRestante = tiempoMax;
let intervalo;


function iniciarBarraTiempo() {
    tiempoRestante = tiempoMax;
    actualizarBarra();

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        tiempoRestante -= 0.1;
        if (tiempoRestante <= 0) {
            tiempoRestante = 0;
            actualizarBarra();
            clearInterval(intervalo);
            estado = "perdido";
            document.getElementById("operacion").textContent = `${num1} ${op} ${num2} = ${solucion}`;
            if (score > maxScore) {
                maxScore = score;
                document.getElementById("NumberMaxScore").textContent = `${maxScore}`;
            }
        } else {
            actualizarBarra();
        }
    }, 100);
}

function actualizarBarra() {
    const barra = document.getElementById("barra-tiempo");
    const porcentaje = (tiempoRestante / tiempoMax) * 100;
    barra.style.width = `${porcentaje}%`;
}

function añadirTiempo(segundos) {
    tiempoRestante = Math.min(tiempoRestante + segundos, tiempoMax);
    actualizarBarra();
}








function pressEnter() {
    document.getElementById("respuesta").value = "";
    estado = "esperando";
    document.getElementById("respuesta").focus();
    document.getElementById("operacion").textContent = "Press Enter to Play";

    tiempoRestante = tiempoMax;
    actualizarBarra();
}

function Ronda() {
    document.getElementById("respuesta").value = "";
    elegirOperando();
    elegirNumeros();
    document.getElementById("operacion").textContent = ` ${num1} ${op} ${num2}`;
}

function comprobar() {
    const respuestaUsuario = parseInt(document.getElementById("respuesta").value);

    if (solucion == respuestaUsuario) {
        score += 1;
        document.getElementById("NumberScore").textContent = `${score}`;
        Ronda();
        añadirTiempo(tiempoMas);
    } else {
        estado = "perdido";
        document.getElementById("respuesta").style.color = "#ce2552";
        document.getElementById("operacion").textContent = `${num1} ${op} ${num2} = ${solucion}`;
        clearInterval(intervalo);
        if (maxScore < score) {
            maxScore = score;
            document.getElementById("NumberMaxScore").textContent = `${maxScore}`;
            document.getElementById("NumberMaxScore").style.color = "#FFD700";
        }
    }
}

function elegirOperando() {
    op = operaciones[Math.floor(Math.random() * operaciones.length)];
}

function elegirNumeros() {
    if (op == "+") {
        num1 = Math.floor(Math.random() * maxSuma) + 1;
        num2 = Math.floor(Math.random() * maxSuma) + 1;
        solucion = num1 + num2;
    }
    if (op == "-") {
        num1 = Math.floor(Math.random() * maxSuma) + 1;
        num2 = Math.floor(Math.random() * num1)+1;
        solucion = num1 - num2;
    }
    if (op == "×") {
        num1 = Math.floor(Math.random() * maxMult) + 2;
        num2 = Math.floor(Math.random() * maxMult) + 2;
        solucion = num1 * num2;
    }
    if (op == "/") {
        num2 = Math.floor(Math.random() * maxMult) + 2;
        solucion = Math.floor(Math.random() * maxMult) + 1;
        num1 = num2 * solucion;
    }
}
function NumerosDificultad(){
    dificultad = document.getElementById("dificultad").value;
    if(dificultad=="facil"){
        maxSuma=10;
        maxMult=8;
        tiempoMas=2;
        tiempoMax=20;
    }
    if(dificultad=="medio"){
        maxSuma=20;
        maxMult=12;
        tiempoMas=1;
        tiempoMax=15;
    }
    if(dificultad=="dificil"){
        maxSuma=30;
        maxMult=15;
        tiempoMas=1;
        tiempoMax=10;
    }
}

document.getElementById("respuesta").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (estado == "jugando") {
            comprobar();
        } else if (estado == "perdido") {
            document.getElementById("respuesta").value = "";
            document.getElementById("respuesta").style.color = "#23B5D3";
            document.getElementById("NumberMaxScore").style.color = "#23B5D3";
            pressEnter();
        } else {
            estado = "jugando";
            score = 0;
            document.getElementById("NumberScore").textContent = `${score}`;
            NumerosDificultad();
            Ronda();
            iniciarBarraTiempo();
        }
    }
});

window.onload = pressEnter;
