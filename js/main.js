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
                if (!peca.selecionada && (peca.tipo !== 'casa' || $scope.peca1 !== '')) {
                    peca.selecionada = true;
                    var qtdSelecionada = tabuleiro.getQtdSeleciondaENaoOcupada();
                    if (qtdSelecionada == 2 && $scope.peca1 !== '') {
                        $scope.peca2 = peca;
                        var peca1 = $scope.peca1;
                        var peca2 = $scope.peca2;
                        var estaoPerto = tabuleiro.pecasEstaoPerto(peca1, peca2);
                        if (peca1.ocupada && !peca2.ocupada) {
                            if (estaoPerto) {
                                tabuleiro.resetPecas();
                                trocarPecas(peca1, peca2);
                                $scope.peca1 = '';
                                $scope.peca2 = '';
                            } else if (tabuleiro.EPossivelComer(tabuleiro.pecas, peca1, peca2)) {
                                trocarPecas(peca1, peca2);
                                $scope.peca1 = '';
                                $scope.peca2 = '';
                                tabuleiro.resetPecas();
                            } else {
                                $scope.peca1 = '';
                                $scope.peca2 = '';
                            }
                            tabuleiro.resetPecas();
                        }
                        $(document).ready(function () {
                            $scope.altura = getAltura();
                        });
                    } else {
                        if (peca.tipo !== 'vazio' && peca.tipo !== 'casa') {
                            peca.selecionada = true;
                            $scope.peca1 = peca;
                        } else {
                            peca.selecionada = false;
                            $scope.peca1 = '';
                            $scope.peca2 = '';
                        }
                    }
                } else {
                    tabuleiro.resetPecas();
                }
            }
        }
);
