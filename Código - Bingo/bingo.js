let participantes = localStorage.getItem("listaParticipantes")?.split(',') || [];

let container = document.getElementById('container');
let btnSacarNumero = document.getElementById('sacarNumero');
let btnReiniciar = document.getElementById('reiniciar');
let ultNumero = document.getElementById('ultNumero');
let historial = document.getElementById('historial');
let btnSalir = document.getElementById('salir');

participantes.forEach(nombre => {
    crearCarton(nombre.trim());
});

function crearCarton(nombre){
    let contCarton = document.createElement('div'); 
    contCarton.classList.add('carton');

    let titulo = document.createElement('h2');
    titulo.textContent = nombre;

    let carton = document.createElement('table');
    let numeros = [];
    while (numeros.length < 15) {
        let numero = Math.floor(Math.random() * 90) + 1;
        if (!numeros.includes(numero)) numeros.push(numero);
    }

    let indice = 0;
    for (let i = 0; i < 3; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td');
    
            let spanNumero = document.createElement('span');
            spanNumero.textContent = numeros[indice];
            spanNumero.classList.add('numero');
    
            td.appendChild(spanNumero);
            td.setAttribute("numero", numeros[indice]);
    
            tr.appendChild(td);
            indice++;
        }
        carton.appendChild(tr);
    }

    contCarton.appendChild(titulo);
    contCarton.appendChild(carton);
    container.appendChild(contCarton);
}

let bombo = [];
for (let i = 1; i <= 90; i++) bombo.push(i);

function sacarNumero(){
    if(bombo.length === 0){
        alert("El bombo está vacío");
        return;
    }

    let indice = Math.floor(Math.random() * bombo.length);
    let numero = bombo.splice(indice, 1)[0];

    ultNumero.textContent = numero;

    let registroHist = document.createElement('span');
    registroHist.textContent = numero + " ";
    historial.appendChild(registroHist);

    marcarNumero(numero);
    comprobarLogro();
}

function marcarNumero(numero){
    let casillas = document.querySelectorAll('td');
    casillas.forEach(td => {
        if(parseInt(td.getAttribute("numero")) === numero){
            td.classList.add('marcado');
        }
    });
}

function comprobarLogro(){
    let cartones = document.querySelectorAll('.carton');

    cartones.forEach(carton => {
        let filas = carton.querySelectorAll('tr');
        let totalMarcadas = 0; 
        let nombre = carton.querySelector('h2').textContent;

        filas.forEach(tr => totalMarcadas += tr.querySelectorAll('td.marcado').length);

        if(!carton.classList.contains('bingo')){

            if (totalMarcadas === 15) {
                carton.classList.add('bingo');
                alert("¡BINGO completo de " + nombre + "!");
            
                carton.style.border = "3px solid #FFD700";
            
                let celdasMarcadas = carton.querySelectorAll('td.marcado');
                celdasMarcadas.forEach(td => td.classList.remove('linea'));
                return;
            }
            

            filas.forEach(tr => {
                let celdas = tr.querySelectorAll('td');
                let marcadas = tr.querySelectorAll('td.marcado');
            
                if(celdas.length === marcadas.length && !tr.classList.contains('linea')){
                    tr.classList.add('linea');
                    marcadas.forEach(td => td.classList.add('linea')); 
                    alert("¡LÍNEA completa de " + nombre + "!");
                }
            });
    }
        
    });
}

function reiniciarJuego(){
    bombo = [];
    for(let i = 1; i <= 90; i++) bombo.push(i);

    historial.innerHTML = "<p>Historial de números: </p>";
    ultNumero.textContent = "";

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    participantes.forEach(nombre => crearCarton(nombre.trim()));
}


btnSalir.addEventListener('click', () => {
    localStorage.removeItem('listaParticipantes');

    reiniciarJuego();

    window.location.href = "index.html";
});

btnSacarNumero.addEventListener('click', sacarNumero);
btnReiniciar.addEventListener('click', reiniciarJuego);