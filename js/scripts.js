var n = 0, ex = 0, w = 0;

function trocarPecas(peca, outraPeca) {
    var aux = peca.img;
//    var aux2 = peca.selecionada;
    var aux3 = peca.ocupada;
    console.log(aux3);
    peca.img = outraPeca.img;
//    peca.selecionada = outraPeca.selecionada;
    peca.ocupada = outraPeca.ocupada;
    console.log(peca.ocupada);
    outraPeca.img = aux;
//    outraPeca.selecionada = aux2;
    outraPeca.ocupada = aux3;
//    peca.selecionada = false;
//    outraPeca.selecionada = false;
}

function getAltura() {
    if (w == 0) {
        ex = 1;
        w = $("button").css('width');
        w = w.substring(0, w.indexOf('px'));
        if (n == 5)
            $("button").css('width', (w * 1.5) + "px");
        else if (n == 4)
            $("button").css('width', (w * 2) + "px");
        $('button').css('height', $("button").css('width'));
        w = $("button").css('width');
        var h = $(".decimo").css('width');
        h = h.substring(0, h.indexOf('px'));
        return w;
    } else {
        $("button").css('width', w);
        $("button").css('height', w);
    }
}
class  Tabuleiro {
    constructor(tamanho) {
        this.tamanho = tamanho;
        n = this.tamanho;
        this.pecas = [];
        for (var i = 0; i < this.tamanho; i++) {
            this.pecas[i] = [];
        }
        this.preencherPecas();
    }
    setImagePecas() {
//        $
    }
    getPecas() {
//        this.setImagePecas();
        return this.pecas;
    }
    setPecas(pecas) {
        this.pecas = pecas;
    }
    preencherPecas() {
        for (var i = 0; i < this.tamanho * 2; i++) {
            var colunas = [];
            for (var j = 0; j < this.tamanho * 2; j++) {
                var img, ocupada = false, tipo = 'vazio';
                if ((i % 2 == 0 & j % 2 == 0) || (i % 2 != 0 & j % 2 != 0)) {
                    if (i <= n - 2) {
                        img = 'url(img/peca_jogador_1.png)';
                        ocupada = true;
                        tipo = 'jogador1';
                    } else if (i > n) {
                        img = 'url(img/peca_jogador_2.png)';
                        tipo = 'jogador2';
                        ocupada = true;
                    } else {
                        img = 'url(img/espaco_casa.png)';
                        tipo = 'casa';
                    }
//                    console.log(img);
                    colunas[j] = {
                        id: '-' + i + '-' + j,
                        cor: "primary",
                        img: img,
                        selecionada: false,
                        ocupada: ocupada,
                        tipo: tipo
                    }
                } else {
                    ocupada = true;
                    colunas[j] = {
                        id: '-' + i + '-' + j,
                        cor: "secundary",
                        img: 'url(img/espaco_vazio.png)',
                        selecionada: false,
                        ocupada: ocupada,
                        tipo: tipo
                    };
//                    (i % 2 != 0 && j % 2 == 0)
                }
            }
            this.pecas[i] = colunas;
        }
//            console.log(this.pecas);
    }
    getQtdSeleciondaENaoOcupada(peca) {
        var qtdSelecionada = 0;
        for (var i = 0; i < this.tamanho * 2; i++) {
            for (var j = 0; j < this.tamanho * 2; j++) {
                if (this.pecas[i][j].selecionada &&
                        this.pecas[i][j].tipo !== 'vazio' && this.pecas[i][j] !== peca)
                    qtdSelecionada++;
            }
        }
        return qtdSelecionada;
    }
    getPecaSelecionda(peca) {
        for (var i = 0; i < this.tamanho * 2; i++) {
            for (var j = 0; j < this.tamanho * 2; j++) {
                if (this.pecas[i][j].selecionada && this.pecas[i][j] !== peca) {
                    return  this.pecas[i][j];
                }
            }
        }
    }
    resetPecas() {
        for (var i = 0; i < this.tamanho * 2; i++) {
            for (var j = 0; j < this.tamanho * 2; j++) {
                this.pecas[i][j].selecionada = false;
            }
        }
    }
}
