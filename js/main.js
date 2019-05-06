$('.hide').hide();
var ultimaMexida = '', iniciou = 0;
var p1, p2, tabuleiros;
angular.module('app', []);
angular.module('app').controller('scripts',
        function ($scope) {
            $scope.tamanho = 4;
            var tabuleiro = new Tabuleiro($scope.tamanho);
            tabuleiros = tabuleiro;
            $scope.tabuleiro = [];
            var pecas = tabuleiro.getPecas();
            $scope.tabuleiro = pecas;
            $scope.altura = '34px';
            $scope.peca1 = '';
            $scope.peca2 = '';
            $scope.iniciar = function () {
                $(document).ready(function () {
                    getAltura();
//                    $('.hide').show();
                });
            };
            $scope.iniciar();
            $scope.selecionar = function (peca) {
                $scope.altura = '34px';
                if (!peca.selecionada && (peca.tipo !== 'casa' || $scope.peca1 !== '')) {
                    peca.selecionada = true;
                    var qtdSelecionada = tabuleiro.getQtdSeleciondaENaoOcupada();
                    if (qtdSelecionada == 1 && $scope.peca1 !== '') {
                        console.log("Qtd Selecionada == 1 e $scope.peca1: " + $scope.peca1 + " !== ''");
                        peca.selecionada = true;
                        $scope.peca2 = peca;
                        var peca1 = $scope.peca1;
                        var peca2 = $scope.peca2;
                        var estaoPerto = tabuleiro.pecasEstaoPerto(peca1, peca2);
                        console.log("Estão perto: " + estaoPerto);
                        if (peca1.ocupada && !peca2.ocupada) {
                            console.log("peca1 ocupada e peca2 não ocupada");
                            if (estaoPerto) {
                                tabuleiro.resetPecas();
                                ultimaMexida = peca1.tipo;
                                trocarPecas(peca1, peca2);
//                                peca2.img += ',url(img/pecas/espaco_casa.png)';
//                                peca1.img = 'url(img/pecas/espaco_casa.png)';
                                console.log("Trocou peças");
                                console.log("ultimaMexida: " + peca1.tipo);
                                console.log("--------------------------");
                                $scope.peca1 = '';
                                $scope.peca2 = '';
//                                console.log("desfocando....");
//                                tabuleiro.desfocar();
                            } else if (tabuleiro.EPossivelComer(tabuleiro.pecas, peca1, peca2)) {
                                console.log("É possivel comer peça");
                                trocarPecas(peca1, peca2);
//                                peca1.img = 'url(img/pecas/espaco_casa.png)';
//                                peca2.img += ',url(img/pecas/espaco_casa.png)';
                                $scope.peca1 = '';
                                $scope.peca2 = '';
                                tabuleiro.resetPecas();
                            } else {
//                                peca1.img += ',url(img/pecas/espaco_casa.png)';
//                                peca2.img = 'url(img/pecas/espaco_casa.png)';
                                console.log("Não trocou peças");
                                console.log("Não é Possivel Comer");
                                console.log("Não estão perto ou esta tentando andar na direção errada");
                                $scope.peca1 = '';
                                $scope.peca2 = '';
                                console.log("--------------------------");
                            }
                            tabuleiro.resetPecas();
                        } else {
//                            peca1.img += ',url(img/pecas/espaco_casa.png)';
//                            peca2.img += ',url(img/pecas/espaco_casa.png)';
                            $scope.peca1 = '';
                            $scope.peca2 = '';
                            console.log("peca1 não ocupada e/ou peca2 ocupada");
                            console.log("--------------------------");
                        }
                        $(document).ready(function () {
                            $scope.altura = getAltura();
                        });
                    } else {
                        console.log("Qtd Selecionada: " + qtdSelecionada + ' != 1 ou');
                        console.log("$scope.peca1: " + $scope.peca1 + " == ''");
                        console.log("");
                        if (peca.tipo !== 'vazio' && peca.tipo !== 'casa') {//Primeira peça
                            console.log("Tipo !== vazio ou Tipo !== casa");
//                            if ((ultimaMexida == '' || ultimaMexida == 'jogador2')
//                                    || ultimaMexida == 'jogador1') {
                            console.log("Peça Selecionada");
                            console.log("--------------------------");

                            peca.selecionada = true;
                            $scope.peca1 = peca;
//                                            focar(peca);
//                focarOutros(tabuleiro.pecas, peca);
//                            console.log("desfocando....");
//                            tabuleiro.desfocar();
//                            }
                        } else {
                            console.log("tipo == vazio ou casa");
//                            if (!peca.img)
//                                peca.img += 'url(img/pecas/espaco_casa.png)';
                            peca.selecionada = false;
                            $scope.peca1 = '';
                            $scope.peca2 = '';
                            tabuleiro.resetPecas();
                        }
                    }
                } else {
                        console.log(" ");
                    console.log("Selecionada: "+peca.selecionada);
                    console.log(peca.img);
//                    if (peca.img == '')
//                        peca.img += 'url(img/pecas/espaco_casa.png)';
//                    else if (peca.img.indexOf("url(img/pecas/espaco_casa.png") == -1)
//                        peca.img += ',url(img/pecas/espaco_casa.png)';
                    console.log("Não há pecas nesse local");
                    console.log("--------------------------");
                    tabuleiro.resetPecas();
                }
//                $scope.selecionar(peca2);
            }
        }
);
