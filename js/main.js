angular.module('app', []);
angular.module('app').controller('scripts',
        function ($scope) {
            $scope.tamanho = 6;
            var tabuleiro = new Tabuleiro($scope.tamanho);
            $scope.tabuleiro = [];
            var pecas = tabuleiro.getPecas();
            $scope.tabuleiro = pecas;
            $scope.selecionar = function (peca) {
                console.log(peca.selecionado);
                if (!peca.selecionado) {
                    peca.selecionado = true;
                    console.log(peca.selecionado);
                    console.log(peca);
                    for (var i = 0; i < this.tamanho * 2; i++) {
                        for (var j = 0; j < this.tamanho * 2; j++) {
                            if (peca !== $scope.tabuleiro[i][j])
                                $scope.tabuleiro[i][j].selecionado = false;
                        }
                    }

                }
            };

        }
);
