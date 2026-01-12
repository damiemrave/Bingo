// Recuperamos la lista de participantes guardada en localStorage
// Si no existe se crea un array vacio
let participantes = localStorage.getItem("listaParticipantes")?.split(',') || [];

// Referencias a nodos del DOM que ya existen en el HTML
let container = document.getElementById('container');
let btnSacarNumero = document.getElementById('sacarNumero');
let btnReiniciar = document.getElementById('reiniciar');
let ultNumero = document.getElementById('ultNumero');
let historial = document.getElementById('historial');
let btnSalir = document.getElementById('salir');

// Declaración de variables para que solo haya una línea y un solo bingo.
let primeraLinea = false;
let primerBingo = false;

// Para cada participante se crea dinamicamente su carton
participantes.forEach(nombre => {
    crearCarton(nombre.trim());
});

// Funcion que crea un carton completo en el DOM
function crearCarton(nombre){
    // Contenedor principal del carton
    let contCarton = document.createElement('div'); 
    contCarton.classList.add('carton');

    // Nodo que muestra el nombre del alumno
    let titulo = document.createElement('h2');
    titulo.textContent = nombre;

    // Tabla que representa el carton
    let carton = document.createElement('table');

    // Array para guardar numeros aleatorios no repetidos
    let numeros = [];
    while (numeros.length < 15) {
        let numero = Math.floor(Math.random() * 90) + 1;
        if (!numeros.includes(numero)) {
            numeros.push(numero);
        }
    }
    
    // Creacion de filas y celdas del carton
    let indice = 0;
    for (let i = 0; i < 3; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td');
    
            // Span que contiene el numero visible
            let spanNumero = document.createElement('span');
            spanNumero.textContent = numeros[indice];
            spanNumero.classList.add('numero');

            // Se añade el número y un atributo personalizado
            td.appendChild(spanNumero);
            td.setAttribute("numero", numeros[indice]);
    
            tr.appendChild(td);
            indice++;
        }
        carton.appendChild(tr);
    }

    // Se insertan todos los nodos en el DOM
    contCarton.appendChild(titulo);
    contCarton.appendChild(carton);
    container.appendChild(contCarton);
}

// Creacion del bombo con numeros del 1 al 90
let bombo = [];
for (let i = 1; i <= 90; i++) {
    bombo.push(i);
}

// Funcion para sacar un numero del bombo
function sacarNumero(){
    if(bombo.length === 0){
        alert("El bombo está vacío");
        return;
    }

    // Seleccion aleatoria de un numero disponible
    let indice = Math.floor(Math.random() * bombo.length);
    let numero = bombo.splice(indice, 1)[0];

    // Mostrar ultimo numero extraido
    ultNumero.textContent = numero;

    // Añadir numero al historial creando un nuevo nodo
    let registroHist = document.createElement('span');
    registroHist.textContent = numero + " ";
    historial.appendChild(registroHist);

    marcarNumero(numero);
    comprobarLogro();
}

// Marca automaticamente las casillas que coincidan con el numero
function marcarNumero(numero){
    let casillas = document.querySelectorAll('td');
    casillas.forEach(td => {
        if(parseInt(td.getAttribute("numero")) === numero){
            td.classList.add('marcado');
        }
    });
}

// Comprueba si hay linea o bingo en los cartones
function comprobarLogro(){
    let cartones = document.querySelectorAll('.carton');

    cartones.forEach(carton => {
        let filas = carton.querySelectorAll('tr');
        let totalMarcadas = 0; 
        let nombre = carton.querySelector('h2').textContent;

        // Contar todas las casillas marcadas del carton
        filas.forEach(tr => totalMarcadas += tr.querySelectorAll('td.marcado').length);

        // Comprobacion de bingo completo
        if(!carton.classList.contains('bingo')){

            if (!primerBingo && totalMarcadas === 15) {
                carton.classList.add('bingo');
                alert("Bingo completo de " + nombre + "!");
            
                carton.style.border = "3px solid #FFD700";
            
                let celdasMarcadas = carton.querySelectorAll('td.marcado');
                celdasMarcadas.forEach(td => td.classList.remove('linea'));
                primerBingo = true;

                // Como ha habido bingo, desaparece el botón de 'Sacar Número' para que se acabe el juego.
                btnSacarNumero.style.display = 'none';
                return;
            }
            
            // Comprobación de linea por filas
            filas.forEach(tr => {
                let celdas = tr.querySelectorAll('td');
                let marcadas = tr.querySelectorAll('td.marcado');
            
                if (celdas.length === marcadas.length && !tr.classList.contains('linea') && !tr.classList.contains('primeralinea')) {
                    // Si es la primera línea aparece un alert y la línea se rellena de amarillo. Si no, se rellena de verde.
                    if(!primeraLinea){
                        tr.classList.add('primeralinea');
                        marcadas.forEach(td => td.classList.add('primeralinea')); 
                        alert("Línea completa de " + nombre + "!");
                        primeraLinea = true;
                    } else {
                        tr.classList.add('linea');
                        marcadas.forEach(td => td.classList.add('linea')); 
                    }
                }
            });
    }
        
    });
}

// Reinicia la partida eliminando nodos y estados
function reiniciarJuego(){
    bombo = [];
    for(let i = 1; i <= 90; i++) bombo.push(i);

    historial.innerHTML = "<p>Historial de números: </p>";
    ultNumero.textContent = "";

    // Eliminacion de todos los cartones del DOM
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    primeraLinea = false;
    primerBingo = false;

    // Creacion de nuevos cartones
    participantes.forEach(nombre => crearCarton(nombre.trim()));

    btnSacarNumero.style.display = 'inline-block';

}

// Eventos de botones
btnSalir.addEventListener('click', () => {
    localStorage.removeItem('listaParticipantes');

    reiniciarJuego();

    window.location.href = "index.html";
});

btnSacarNumero.addEventListener('click', sacarNumero);
btnReiniciar.addEventListener('click', reiniciarJuego);