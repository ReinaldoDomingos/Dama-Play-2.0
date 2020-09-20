async function iniciarPartida() {
    return await axios.get("/iniciarPartida");
}

async function getAlteracoes(sessionId) {
    return await axios.get("/alteracoes?sessionId=" + sessionId);
}

async function zerarJogo() {
    return await axios.get("/zerarJogo");
}

async function conferirUsuario(sessionId) {
    return await axios.get("/conferirUsuario?sessionId=" + sessionId);
}

async function possoMoverPeca(sessionId) {
    return await axios.get("/possoMoverPeca?sessionId=" + sessionId)
}

async function enviarMovimentoPeca(sessionId, campoPeca, campoDesocupado) {
    return await axios.get("moverPeca?sessionId=" + sessionId + "&posInicial=[" + [campoPeca.pos.x, campoPeca.pos.y]
        + "]&posFinal=[" + [campoDesocupado.pos.x, campoDesocupado.pos.y].toString() + "]")
}
