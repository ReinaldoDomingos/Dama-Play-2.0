let idAtual = 0;

function isPar(num) {
    return num % 2 === 0;
}

function isImpar(num) {
    return num % 2 !== 0;
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
        $scope.tabuleiro[x][y] = {
            img: 'url(img/pecas/espaco_casa.png)',
            selecionada: false,
            cor: 'secundary',
            ocupada: false,
            jogador: 0
        };
    }

    $scope.tabuleiro[x][y].pos = {x: x, y: y};
    $scope.tabuleiro[x][y].id = id;
}

function gerarPeca(jogador) {
    let peca = {
        selecionada: false,
        cor: 'secundary',
        jogador: jogador,
        ocupada: true
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
        ocupada: false,
        jogador: -1,
        id: id
    };
}
