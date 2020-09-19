let idAtual = 0;

function isPar(num) {
    return num % 2 === 0;
}

function isImpar(num) {
    return num % 2 !== 0;
}

function addCampoSemPeca(id) {
    return {
        img: 'url(img/pecas/espaco_casa.png)',
        selecionada: false,
        cor: 'secundary',
        jogador: 0,
        id: id
    };
}

function addPeca($scope, x, y, id) {
    if (x < 8 / 2 - 1) {
        let posX = x % 3;
        let posY = y === 0 ? 0 : parseInt(y / 2);
        $scope.tabuleiro[x][y] = $scope.jogador1.pecas[posX][posY];
    } else if (x > 8 / 2) {
        let posX = x % 5;
        let posY = y === 0 ? 0 : parseInt(y / 2);
        $scope.tabuleiro[x][y] = $scope.jogador2.pecas[posX][(posY)];
    } else {
        $scope.tabuleiro[x][y] = addCampoSemPeca(id);
    }

    $scope.tabuleiro[x][y].pos = {x: x, y: y};
    $scope.tabuleiro[x][y].id = id;
}

function gerarPeca(jogador) {
    let peca = {
        selecionada: false,
        cor: 'secundary',
        jogador: jogador
    };

    if (peca.jogador === 1) {
        peca.img = 'url(img/pecas/black_man2.png)';
    } else if (peca.jogador === 2) {
        peca.img = 'url(img/pecas/white_man2.png)';
    }

    return peca;
}

function addEspacoVazio($scope, x, y, id) {
    $scope.tabuleiro[x][y] = {
        img: 'url(img/pecas/espaco_vazio.png)',
        selecionada: false,
        pos: {x: x, y: y},
        cor: 'secundary',
        jogador: -1,
        id: id
    };
}

function desmarcarTodos($scope) {
    $scope.selecionada = undefined;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            $scope.tabuleiro[x][y].selecionada = false;
        }
    }
}

function isPosicaoDeCasa(x, y) {
    return (isImpar(x) && isPar(y)) || (isPar(x) && isImpar(y));
}

function marcarPecaComoSelecionada($scope, peca) {
    let x2 = peca.pos.x;
    let y2 = peca.pos.y;

    $scope.selecionada = {x: x2, y: y2, jogador: peca.jogador};
    $scope.tabuleiro[x2][y2].selecionada = true;
}

function isSelecionada(peca) {
    return peca.selecionada;
}

function isMesmoJogador(item1, item2) {
    return item1.jogador === item2.jogador && item1.jogador > 0 && item2.jogador > 0;
}

function isCasaOcupada(peca) {
    return peca.jogador !== 0;
}
