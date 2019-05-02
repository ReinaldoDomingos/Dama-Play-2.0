angular.module('app', []);
angular.module('app').controller('scripts',
        function ($scope) {
            $scope.tamanho = 4;
            var tabuleiro = new Tabuleiro($scope.tamanho);
            $scope.tabuleiro = [];
            var pecas = tabuleiro.getPecas();
            $scope.tabuleiro = pecas;
            $scope.altura = '34px';
            $scope.peca1 = '';
            $scope.peca2 = '';
            $scope.iniciar = function () {
                $(document).ready(function () {
                    getAltura();
                });
            };
            $scope.iniciar();
            $scope.selecionar = function (peca) {
                $scope.altura = '34px';
//                console.log(peca);
//                console.log(!peca.selecionada);
//                console.log((peca.tipo !== 'casa'));
                console.log($scope.peca1 !== '');
                if (!peca.selecionada && (peca.tipo !== 'casa' || $scope.peca1 !== '')) {
                    var qtdSelecionada = tabuleiro.getQtdSeleciondaENaoOcupada();
                    console.log(qtdSelecionada);
                    if (qtdSelecionada == 1) {
                        console.log('a2');
                        peca.selecionada = true;
                        $scope.peca2 = peca;
//                        var outraPeca = tabuleiro.getPecaSelecionda(peca);
//                        console.log(outraPeca);
//                        trocarPecas(peca, outraPeca);
                        var peca1 = $scope.peca1;
                        var peca2 = $scope.peca2;
                        console.log(peca1.ocupada);
                        console.log(!peca2.ocupada);
                        if (peca1.ocupada && !peca2.ocupada) {
                            console.log("ok");
                            trocarPecas(peca1, peca2);
                            console.log('ok');
                            $scope.peca1 = '';
                            $scope.peca2 = '';
                        }
                        tabuleiro.resetPecas();
                        $(document).ready(function () {
                            $scope.altura = getAltura();
//                            console.log($scope.altura);
                        });
                    } else {
                        if (peca.tipo !== 'vazio' && peca.tipo !== 'casa') {
                            peca.selecionada = true;
                            $scope.peca1 = peca;
                            console.log("a1");
                        }
                    }
                } else {
                    peca.selecionada = false;
                    console.log('a3');
                }
            }
            ;
        }
);
