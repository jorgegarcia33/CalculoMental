let num1, num2, solucion, score, maxScore = 0, estado, op;
let maxSuma,maxMult, tiempoMas;
const operacionesFacil = ["+","-"];
const operacionesMedio = ["+","-","+","-","×"];
const operacionesDificil = ["+", "+", "+", "-", "-", "-", "×", "/"];
let operaciones;

let tiempoMax;
let tiempoRestante = tiempoMax;
let intervalo;
let dificultadActual;

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
    ElegirOp();
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
        document.getElementById("respuesta").style.color = "#dc7f89";
        document.getElementById("operacion").textContent = `${num1} ${op} ${num2} = ${solucion}`;
        clearInterval(intervalo);
        if (maxScore < score) {
            maxScore = score;
            document.getElementById("NumberMaxScore").textContent = `${maxScore}`;
            document.getElementById("NumberMaxScore").style.color = "#d8807a";
        }
    }
}

function ElegirOp() {
    op = operaciones[Math.floor(Math.random() * operaciones.length)];
}

function selectorDif(){
    if(dificultadActual=="facil"){
        maxSuma=20;
        maxMult=8;
        tiempoMas=3;
        tiempoMax=30;
        operaciones=operacionesFacil;
    }
    else if(dificultadActual=="medio"){
        maxSuma=50;
        maxMult=10;
        tiempoMas=2;
        tiempoMax=20;
        operaciones=operacionesMedio;
    }
    else if(dificultadActual=="dificil"){
        maxSuma=100;
        maxMult=20;
        tiempoMas=2;
        tiempoMax=20;
        operaciones=operacionesDificil;
    }
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
        num1 = Math.floor(Math.random() * maxMult) + 1;
        num2 = Math.floor(Math.random() * maxMult) + 1;
        solucion = num1 * num2;
    }
    if (op == "/") {
        num2 = Math.floor(Math.random() * maxMult) + 1  ;
        solucion = Math.floor(Math.random() * maxMult) + 1;
        num1 = num2 * solucion;
    }
}

document.getElementById("respuesta").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (estado == "jugando") {
            comprobar();
        } else if (estado == "perdido") {
            document.getElementById("respuesta").value = "";
            document.getElementById("respuesta").style.color = "#e5cc69";
            document.getElementById("NumberMaxScore").style.color = "#e5cc69";
            document.getElementById('dif-barra').style.display = 'flex';
            document.getElementById('modo-barra').style.display = 'flex';
            pressEnter();
        } else {
            estado = "jugando";
            score = 0;
            document.getElementById("NumberScore").textContent = `${score}`;
            selectorDif();
            Ronda();
            iniciarBarraTiempo();
            document.getElementById('dif-barra').style.display = 'none';
            document.getElementById('modo-barra').style.display = 'none';

        }
    }
});

const modoBtns = document.querySelectorAll('.modo-btn');
let modoActual = 'infinito'; // Valor por defecto

modoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modoBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        modoActual = btn.dataset.modo;
        if(modoActual=='racha'){
            document.getElementById('dif-barra').style.display = 'none';
        }
        else if(modoActual=='infinito'){
            document.getElementById('dif-barra').style.display = 'flex';
        }
        document.getElementById("respuesta").focus();
    });
});



// Asignar comportamiento a los botones de dificultad
const dificultadBtns = document.querySelectorAll('.dificultad-btn');
dificultadActual = 'medio'; // Valor por defecto

dificultadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        dificultadBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        dificultadActual = btn.dataset.dificultad;
        document.getElementById("respuesta").focus();
    });
});


window.onload = pressEnter;
