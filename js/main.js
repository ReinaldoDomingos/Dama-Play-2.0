angular.module('app', []);
angular.module('app').controller('scripts',
        function ($scope) {
            var tabuleiro = new Tabuleiro(5);
            $scope.tabuleiro = [];
            var pecas = tabuleiro.getPecas();
            $scope.tabuleiro = pecas;
//            console.log($scope.pecas[0].linha.length);
//            console.log($scope.pecas[1].linha.length);
//            console.log($scope.pecas[2].linha.length);
//            console.log($scope.pecas[3].linha.length);
        }
);
