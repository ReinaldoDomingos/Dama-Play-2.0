angular.module('app', []);

angular.module('app').controller('DamasController', function ($scope) {
        $scope.tabuleiro = [];
        $scope.jogador1 = {pecas: []};
        $scope.jogador2 = {pecas: []};
        $scope.size = '68px';

        for (let i = 0; i < 4; i++) {
            $scope.jogador1.pecas.push([]);
            $scope.jogador2.pecas.push([]);
            $scope.tabuleiro.push([]);
            $scope.tabuleiro.push([]);
        }

        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                $scope.jogador1.pecas[x][y] = gerarPeca(1);
                $scope.jogador2.pecas[x][y] = gerarPeca(2);
            }
        }

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (isImpar(x) && isPar(y) || isPar(x) && isImpar(y)) {
                    addPeca($scope, x, y);
                } else {
                    addEspacoVazio($scope, x, y);
                }
            }
        }
    }
);