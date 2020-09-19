async function iniciarPartida() {
    return await axios.get("/iniciarPartida");
}

async function zerarJogo() {
    return await axios.get("/zerarJogo");
}

async function conferirUsuario(sessionId) {
    return await axios.get("/conferirUsuario?sessionId=" + sessionId);
}

async function podeSelecionar() {
    return await axios.get("/iniciarPartida")
}
