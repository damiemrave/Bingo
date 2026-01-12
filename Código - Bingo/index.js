// Obtiene tanto el boton como la lista
const submitBtn = document.getElementById('submit');
const inputLista = document.getElementById('lista');
const selectGrupos = document.getElementById('grupos');

// Evento que se ejecuta al pulsar el boton
selectGrupos.addEventListener("change", () => {
    // Comprobación de la selección de grupos predeterminados.
    if (selectGrupos.value !== "" && selectGrupos.value !== "none") {
        // Se añade el grupo predeterminado al input.
        inputLista.value = selectGrupos.value;
    } else {
        inputLista.value = "";
    }
});


// Evento que se ejecuta al pulsar el boton
submitBtn.addEventListener('click', () => {
    // Se obtiene el valor del input y se separa por comas
    // Con la funcion trim() se elimina espacios y filter evita que los nombres esten vacios
    const lista = inputLista.value.split(",").map(p => p.trim()).filter(p => p !== "");

    // Comprobación de que la lista no este vacia
    if(lista === "") {
        alert("Debes escribir al menos un nombre.");
        return;
    }

    // Se guarda la lista de participantes en localStorage
    // para poder usarla en la pagina del bingo
    localStorage.setItem("listaParticipantes", lista);

    // Redireccion a la pagina del bingo
    window.location.href = "bingo.html";
});