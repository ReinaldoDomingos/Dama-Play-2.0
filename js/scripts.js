var n = 0, ex = 0, w = 0;
function trocarPecas(peca, outraPeca) {
    var aux = peca.img;
    var aux2 = peca.tipo;
    var aux3 = peca.ocupada;
    peca.img = outraPeca.img;
    peca.tipo = outraPeca.tipo;
    peca.ocupada = outraPeca.ocupada;
    outraPeca.img = aux;
    outraPeca.tipo = aux2;
    outraPeca.ocupada = aux3;
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
    }
    getPecas() {
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
                    colunas[j] = {
                        id: i + '-' + j,
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
                }
            }
            this.pecas[i] = colunas;
        }
    }
    getQtdSeleciondaENaoOcupada(peca) {
        var qtdSelecionada = 0;
        for (var i = 0; i < this.tamanho * 2; i++) {
            for (var j = 0; j < this.tamanho * 2; j++) {
                if (this.pecas[i][j].selecionada &&
                        this.pecas[i][j].tipo !== 'vazio' && this.pecas[i][j] !== peca) {
                    qtdSelecionada++;
                }
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
    pecasEstaoPerto(peca1, peca2) {
        var id1 = peca1.id.split('-');
        var id2 = peca2.id.split('-');
        id1[0] = parseInt(id1[0]);
        id1[1] = parseInt(id1[1]);
        id2[0] = parseInt(id2[0]);
        id2[1] = parseInt(id2[1]);
        var peca1PodeMoverCima = (peca1.tipo === 'jogador1' ? false : true);
        var peca1PodeMoverBaixo = (peca1.tipo === 'jogador2' ? false : true);
        var estaoPerto =
                (((id1[0] + 1 == id2[0] && peca1PodeMoverBaixo) //linha abaixo
                        || (id1[0] - 1 == id2[0] && peca1PodeMoverCima))//linha acima
                        && ((id1[1] + 1 == id2[1])//coluna direita
                                || (id1[1] - 1 == id2[1]))); //coluna esquerda
        return estaoPerto;
    }
    EPossivelComer(pecas, peca1, peca2) {
        var id1 = peca1.id.split('-');
        var id2 = peca2.id.split('-');
        id1[0] = parseInt(id1[0]);
        id1[1] = parseInt(id1[1]);
        id2[0] = parseInt(id2[0]);
        id2[1] = parseInt(id2[1]);

        var peca1PodeMoverCima = (peca1.tipo === 'jogador1' ? false : true);
        var peca1PodeMoverBaixo = (peca1.tipo === 'jogador2' ? false : true);

        //Abaixo a direita
        var possivelPecaASerComida_b_d = 0;
        try {
            possivelPecaASerComida_b_d = pecas[id1[0] + 1][id1[1] + 1];
            //Abaixo a esquerda
        } catch (err) {
        }
        var possivelPecaASerComida_b_e = 0;
        try {
            possivelPecaASerComida_b_e = pecas[id1[0] + 1][id1[1] - 1];
        } catch (err) {
        }
        //Acima a direita
        var possivelPecaASerComida_c_d = 0;
        try {
            possivelPecaASerComida_c_d = pecas[id1[0] - 1][id1[1] + 1];
        } catch (err) {
        }
        //Acima a esquerda
        var possivelPecaASerComida_c_e = 0;
        try {
            possivelPecaASerComida_c_e = pecas[id1[0] - 1][id1[1] - 1];
        } catch (err) {
        }
        this.resetPecas();
        var res = false;
        try {
            if (possivelPecaASerComida_b_d.ocupada &&
                    (id1[0] + 2 == id2[0])
                    && (id1[1] + 2 == id2[1])
                    && peca1PodeMoverBaixo
                    && peca1.tipo !== pecas[id1[0] + 1][id1[1] + 1].tipo) {
                possivelPecaASerComida_b_d.cor = 'primary';
                possivelPecaASerComida_b_d.img = 'url(img/espaco_casa.png)';
                possivelPecaASerComida_b_d.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        try {
            if (possivelPecaASerComida_b_e.ocupada &&
                    (id1[0] + 2 == id2[0])
                    && (id1[1] - 2 == id2[1])
                    && peca1PodeMoverBaixo
                    && peca1.tipo !== pecas[id1[0] + 1][id1[1] - 1].tipo) {
                possivelPecaASerComida_b_e.cor = 'primary';
                possivelPecaASerComida_b_e.img = 'url(img/espaco_casa.png)';
                possivelPecaASerComida_b_e.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        try {
            if (possivelPecaASerComida_c_d.ocupada &&
                    (id1[0] - 2 == id2[0])
                    && (id1[1] + 2 == id2[1])
                    && peca1PodeMoverCima
                    && peca1.tipo !== pecas[id1[0] - 1][id1[1] + 1].tipo) {
                possivelPecaASerComida_c_d.cor = 'primary';
                possivelPecaASerComida_c_d.img = 'url(img/espaco_casa.png)';
                possivelPecaASerComida_c_d.ocupada = false;
                return true;

            }
        } catch (err) {
        }
        try {
            if (possivelPecaASerComida_c_e.ocupada &&
                    (id1[0] - 2 == id2[0])
                    && (id1[1] - 2 == id2[1])
                    && peca1PodeMoverCima
                    && peca1.tipo !== pecas[id1[0] - 1][id1[1] - 1].tipo) {
                possivelPecaASerComida_c_e.cor = 'primary';
                possivelPecaASerComida_c_e.img = 'url(img/espaco_casa.png)';
                possivelPecaASerComida_c_e.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        return res;
    }
    resetPecas() {
        for (var i = 0; i < this.tamanho * 2; i++) {
            for (var j = 0; j < this.tamanho * 2; j++) {
                this.pecas[i][j].selecionada = false;
            }
        }
    }
}
