function moverPeca($scope, peca) {
    let x1 = $scope.selecionada.x;
    let y1 = $scope.selecionada.y;
    let x2 = peca.pos.x;
    let y2 = peca.pos.y;

    let campoPeca = $scope.tabuleiro[x1][y1];
    let campoDesocupado = $scope.tabuleiro[x2][y2];

    let podeMover = podeMoverPeca($scope, x1, x2, y1, y2, campoPeca.jogador);
    if (!podeMover) {
        return
    } else if (podeMover === 2) {
        let isMovimentoDuplo = movimentoDuplo($scope, x1, x2, y1, y2, campoPeca.jogador);
        if (!isMovimentoDuplo) return;
    }

    console.log(x1, y1, ' para ', x2, y2);
    campoPeca.pos = {x: x2, y: y2};
    campoDesocupado.pos = {x: x1, y: y1};

    $scope.tabuleiro[x1][y1] = {};
    $scope.tabuleiro[x2][y2] = {};

    $scope.tabuleiro[x1][y1] = campoDesocupado;
    $scope.tabuleiro[x2][y2] = campoPeca;
}

function removerPeca($scope, x, y) {
    $scope.tabuleiro[x][y] = addCampoSemPeca(idAtual++);
    $scope.tabuleiro[x][y].pos = {x: x, y: y};
}

function movimentoDuplo($scope, x1, x2, y1, y2, jogador) {
    console.log('movimentoDuplo', `${x1}x${y1} para ${x2}x${y2}`);
    if (jogador === 2 && x1 - x2 === 2) {
        console.log('mov1')
        if (y1 > 0 && y1 - y2 === 2 && $scope.tabuleiro[x1 - 1][y1 - 1].jogador === 1) {
            console.log('capturar peça jogador 1');
            removerPeca($scope, x1 - 1, y1 - 1);
            return true;
        }
        if (y2 < 8 && y2 - y1 === 2 && $scope.tabuleiro[x1 - 1][y1 + 1].jogador === 1) {
            console.log('capturar peça jogador 1');
            removerPeca($scope, x1 - 1, y1 + 1);
            return true;
        }
    }

    if (jogador === 1 && x2 - x1 === 2 && (y1 - y2 === 2 || y2 - y1 === 2)) {
        console.log('mov2')
        if (y1 > 0 && $scope.tabuleiro[x2 - 1][y1 - 1].jogador === 2) {
            console.log('capturar peça jogador 1');
            removerPeca($scope, x2 - 1, y1 - 1);
            return true;
        }
        if (y2 < 8 && $scope.tabuleiro[x2 - 1][y1 + 1].jogador === 2) {
            console.log('capturar peça jogador 1');
            removerPeca($scope, x2 - 1, y1 + 1);
            return true;
        }
    }
    console.log('não é movimentoDuplo');
    return false;
}

function podeMoverPeca($scope, x1, x2, y1, y2, jogador) {
    if (y1 === y2) {
        return false;
    } else if ((y2 - y1 === 1 || y1 - y2 === 1) && ((jogador === 1 && x2 - x1 === 1) || (jogador === 2 && x1 - x2 === 1))) {
        console.log('podeMoverPeca', `${x1}x${y1} para ${x2}x${y2}`);
        return true;
    } else if ((jogador === 1 && x2 - x1 === 2) || (jogador === 2 && x1 - x2 === 2)) {
        return 2;
    }

    return false;
}