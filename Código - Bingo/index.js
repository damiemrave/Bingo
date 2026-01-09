const submitBtn = document.getElementById('submit');
const inputLista = document.getElementById('lista');

submitBtn.addEventListener('click', () => {
    const lista = inputLista.value.trim();
    if(lista === "") {
        alert("Debes escribir al menos un nombre.");
        return;
    }
    localStorage.setItem("listaParticipantes", lista);
    window.location.href = "bingo.html";
});