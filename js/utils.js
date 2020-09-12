function isPar(num) {
    return num % 2 === 0;
}

function isImpar(num) {
    return num % 2 !== 0;
}

function addPeca($scope, x, y) {
    console.log('addPeca ', x, y)
    if (x < 8 / 2 - 1) {
        $scope.tabuleiro[x][y] = $scope.jogador1.pecas[x % 4][y % 4];
    } else if (x > 8 / 2) {
        $scope.tabuleiro[x][y] = $scope.jogador2.pecas[x % 4][(y % 4)];
    } else {
        $scope.tabuleiro[x][y] = {
            img: 'url(img/pecas/espaco_casa.png)',
            cor: 'secundary',
            selecionada: false,
            ocupada: false,
            jogador: 0
        };

    }
}

function gerarPeca(jogador) {
    let peca = {
        selecionada: false,
        ocupada: true,
        jogador: jogador,
        cor: 'secundary',
    };

    if (peca.jogador === 1) {
        peca.img = 'url(img/pecas/black_man2.png)';
    } else if (peca.jogador === 2) {
        peca.img = 'url(img/pecas/white_man2.png)';
    }

    return peca;
}

function addEspacoVazio($scope, x, y) {
    $scope.tabuleiro[x][y] = {
        img: 'url(img/pecas/espaco_vazio.png)',
        cor: 'secundary',
        selecionada: false,
        ocupada: false,
        jogador: 0
    };
}
