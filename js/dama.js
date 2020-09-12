function moverPeca($scope, peca) {
    let x1 = $scope.selecionada.x;
    let y1 = $scope.selecionada.y;
    let x2 = peca.pos.x;
    let y2 = peca.pos.y;

    console.log(x1, y1, ' para ', x2, y2);

    let campoDesocupado = $scope.tabuleiro[x1][y1];
    let campoPeca = $scope.tabuleiro[x2][y2];
    campoDesocupado.pos = {x: x2, y: y2};
    campoPeca.pos = {x: x1, y: y1};

    $scope.tabuleiro[x1][y1] = {};
    $scope.tabuleiro[x2][y2] = {};

    $scope.tabuleiro[x1][y1] = campoPeca;
    $scope.tabuleiro[x2][y2] = campoDesocupado;
}

function movimentoDuplo($scope, peca) {
//TODO implementar
    moverPeca($scope, peca);
    moverPeca($scope, peca);
}