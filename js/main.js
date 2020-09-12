angular.module('app', []);

function desmarcarTodos($scope) {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            console.log($scope.tabuleiro[x][y].id)
            $scope.tabuleiro[x][y].selecionada = false;
        }
    }
}

function isPosicaoDeCasa(x, y) {
    return (isImpar(x) && isPar(y)) || (isPar(x) && isImpar(y));
}

angular.module('app').controller('DamasController', function ($scope) {
        function inicializarVariaveis() {
            $scope.tabuleiro = [];
            $scope.jogador1 = {pecas: []};
            $scope.jogador2 = {pecas: []};
            $scope.size = '68px';
        }

        function initialize() {
            for (let i = 0; i < 4; i++) {
                $scope.jogador1.pecas.push([]);
                $scope.jogador2.pecas.push([]);
                $scope.tabuleiro.push([]);
                $scope.tabuleiro.push([]);
            }

            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 4; y++) {
                    $scope.jogador1.pecas[x][y] = gerarPeca(1);
                    $scope.jogador2.pecas[x][y] = gerarPeca(2);
                }
            }

            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let id = idAtual++;
                    if (isPosicaoDeCasa(x, y)) {
                        addPeca($scope, x, y, id);
                    } else {
                        addEspacoVazio($scope, x, y, id);
                    }
                }
            }
        }

        function inicializarFuncoes() {
            $scope.selecionar = function (peca) {
                if (peca.jogador === -1) return;

                let x = peca.pos.x;
                let y = peca.pos.y;

                console.log(x, y);

                if ($scope.selecionada && peca.jogador === 1) {
                    desmarcarTodos($scope);
                    $scope.selecionada = undefined;
                    $scope.tabuleiro[x][y].img = peca.img;
                } else if (!peca.selecionada) {
                    $scope.selecionada = {x: x, y: y};
                    $scope.tabuleiro[x][y].selecionada = true;
                }
            }
        }

        inicializarVariaveis();
        inicializarFuncoes();
        initialize();
    }
);