angular.module('app', []);

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

                if (isSelecionada($scope) && !peca.selecionada && peca.jogador === 0) {
                    console.log('passo3');
                    moverPeca($scope, peca);
                    desmarcarTodos($scope);
                } else if ((!isSelecionada($scope) && !isSelecionada(peca) && isCasaOcupada(peca))
                    || (isSelecionada($scope) && isMesmoJogador($scope.selecionada, peca))
                    || (isSelecionada(peca) || (isSelecionada($scope) && !isMesmoJogador($scope.selecionada, peca)))) {
                    console.log('passo1')
                    console.log('selecionada')
                    desmarcarTodos($scope);
                    marcarPecaComoSelecionada($scope, peca);
                } else {
                    console.log('passo 5')
                }
            }
        }

        inicializarVariaveis();
        inicializarFuncoes();
        initialize();
    }
);