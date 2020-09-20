angular.module('app', []);

angular.module('app').controller('DamasController', function ($scope) {
        function inicializarVariaveis() {
            $scope.tabuleiro = [];
            $scope.jogador1 = {pecas: []};
            $scope.jogador2 = {pecas: []};
            $scope.size = '68px';
            $scope.podeSelecionar = false;
            $scope.alteracoes = {};
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
            let jogador = -1;

            let searchString = "/sessionId/";
            if (location.pathname.indexOf(searchString) !== -1) {
                jogador = location.pathname.replace(searchString, "")
            }

            if (localStorage.getItem("jogador")) {
                $scope.jogador1.numero = jogador = localStorage.getItem("jogador");
                setSessionId($scope);
            }

            if ($scope.jogador1.numero) {
                console.log('conferir usuario e iniciarPartida')
                conferirUsuario($scope.jogador1.numero).then(response => {
                    salvarJogador(response, $scope);
                });
            } else {
                console.log('iniciarPartida')
                iniciarPartida().then(response => {
                    salvarJogador(response, $scope);
                });
            }

            console.log('jogador', $scope.jogador1.numero)

            setInterval(function () {
                conferirUsuario($scope.jogador1.numero).then(response => {
                    salvarJogador(response, $scope);
                });

                possoMoverPeca($scope.jogador1.numero).then(response => {
                    if ($scope.podeSelecionar === response.data.podeMovePeca) return;
                    $scope.podeSelecionar = response.data.podeMoverPeca;
                    $scope.$apply();
                    getAlteracoes($scope.jogador1.numero).then(res => {
                        if (res.data && $scope.alteracoes !== res.data) {
                            $scope.alteracoes = res.data;
                            moverPecaDoOutroLado($scope, $scope.alteracoes);
                            $scope.$apply();
                        }
                    })
                })
            }, 300)
        }

        function inicializarFuncoes() {
            $scope.selecionar = function (peca) {
                if (!$scope.podeSelecionar || peca.jogador === -1 || peca.jogador === 2) return;

                if (isSelecionada($scope) && !peca.selecionada && peca.jogador === 0) {
                    console.log('passo3');
                    moverPecaLocal($scope, peca);
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

            $scope.pecaController = function (peca) {
                let numero = $scope.jogador1.numero;
                if (!numero) numero = 1;
                return {
                    'selecionada': peca.selecionada,
                    'j1': peca.jogador > 0 && peca.jogador == numero,
                    'j2': peca.jogador > 0 && peca.jogador != numero,
                    'espaco_vazio': peca.jogador === -1,
                    'espaco_casa': peca.jogador === 0
                };
            };

            $scope.removerJogador = removerJogador;
        }

        inicializarVariaveis();
        inicializarFuncoes();
        initialize();
    }
);