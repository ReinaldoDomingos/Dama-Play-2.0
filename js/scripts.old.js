let n = 0, ex = 0, w = 0, damasj1 = 0, damasj2 = 0;

function focar(peca) {
//    console.log(peca.img);
    let img = peca.img.split(',');
    let i = img.length;
    if (img[0] !== 'url(img/pecas/espaco_casa.png)') {
//        console.log("ok10");
        peca.img = img[0];
    } else {
//        console.log("ok11");
        peca.img = '';
    }

    //    console.log("peca.img " + peca1.img);
//    console.log(peca1.img);
    for (let j = 1; j < i - 1; j++) {
//        console.log("okf");
        peca.img += ',' + img[j];
//        console.log(peca1.img);
    }

}

function focarOutros(pecas, peca) {
    this.tipo = peca.tipo;
    let x = peca.pos.x;
    let y = peca.pos.y;
    if (this.tipo === "jogador1") {
        if (y + 1 <= n * 2 - 1) {
            if (x + 1 <= n * 2 - 1)
                focar(pecas[y + 1][x + 1]);
            if (x - 1 >= 0)
                focar(pecas[y + 1][x - 1]);
        }
    }
    if (this.tipo === "jogador2") {
        if (y - 1 >= 0) {
            if (x + 1 <= n * 2 - 1)
                focar(pecas[y - 1][x + 1]);
            if (x - 1 >= 0)
                focar(pecas[y - 1][x - 1]);
        }
    }
}

n = 0;
ex = 0;
w = 0;

function trocarPecas(peca, outraPeca) {
    let aux = peca.img;
    let aux2 = peca.tipo;
    let aux3 = peca.ocupada;
    peca.img = outraPeca.img;
    peca.tipo = outraPeca.tipo;
    peca.ocupada = outraPeca.ocupada;
    outraPeca.img = aux;
    outraPeca.tipo = aux2;
    outraPeca.ocupada = aux3;
    verificarDama(outraPeca);

    console.log(peca.pos);
    console.log(outraPeca.pos);
    if (peca.tipo === "jogador1" && peca.pos.x === n * 2 - 1) {
        console.log("ok");
    }
}

function verificarDama(peca) {
    let y = peca.pos.y;
    if (peca.tipo === "jogador1" && y === n * 2 - 1) {
        peca.img = "url(img/pecas/black_queen_crown.png)," + peca.img;
        peca.tipo = "damaj1";
    }
    if (peca.tipo === "jogador2" && y === 0) {
        peca.img = "url(img/pecas/white_queen_crown.png)," + peca.img;
        peca.tipo = "damaj2";
    }
}

function getAltura() {
    let btns = $("button");
    if (w === 0) {
        ex = 1;
        w = btns.css('width');
        w = w.substring(0, w.indexOf('px'));
        if (n === 5)
            btns.css('width', (w * 1.5) + "px");
        else if (n === 4)
            btns.css('width', (w * 2) + "px");
        $('button').css('height', btns.css('width'));
        w = btns.css('width');
        let h = $(".decimo").css('width');
        h = h.substring(0, h.indexOf('px'));
        setLayout();
        return w;
    } else {
        btns.css('width', w);
        btns.css('height', w);
    }

}

function setLayout() {
    let clssRow = $('.row');
    let row = clssRow.css('width');
    row = row.substring(0, row.indexOf('px'));
    let tabuleiro = $('.coluna').css('width');
    tabuleiro = tabuleiro.substring(0, tabuleiro.indexOf('px'));
    let btns = $('button');
    if (innerWidth <= 585 && innerWidth > 334) {
        clssRow.css('margin', '0px !important');
        btns.css('width', (row / n / 2) + 'px');
        btns.css('height', (row / n / 2) + 'px');
        console.log('ok4');
    } else if (innerWidth > 700) {
        clssRow.css("margin-left", (((row - (tabuleiro * n * 2)) / 2) + 'px'));
        clssRow.css("margin-rigth", (((row - (tabuleiro * n * 2)) / 2) + 'px'));
        console.log('ok3');
    } else if (row < tabuleiro * n * 2 && innerWidth > 334) {
        btns.css('width', (row / n / 2) + 'px');
        btns.css('height', (row / n / 2) + 'px');
        console.log('ok2');
    } else if (innerWidth === 320) {
        w = (innerWidth / 8) * 0.9;
        $('.container-fluid').css('width', (innerWidth) + 'px');
        $('.jumbotron').css('width', "-webkit-fill-available")
            .css('margin', '0px')
            .css('margin-top', '10%')
            .css('padding', '0px');
        clssRow.css('width', (innerWidth) + 'px');
        btns.css('width', ((innerWidth / 8) * 0.9) + 'px');
        btns.css('height', ((innerWidth / 8) * 0.9) + 'px');

        console.log('ok');
    }
//    alert(innerWidth);
    console.log('coluna ' + tabuleiro);
    console.log('tabuleiro ' + (tabuleiro * n * 2) + 'px');
    if (tabuleiro * n < row) {
//        $('button').css('width', (row / n / 2) + 'px');
//        $('button').css('height', (row / n / 2) + 'px');
        console.log('marginr' + ((((row - (tabuleiro * n * 2)) / 2) + 'px')));
    }
    console.log('row ' + row);
    console.log('page ' + innerWidth);
}

class Tabuleiro {
    constructor(tamanho) {
        this.tamanho = tamanho;
        n = this.tamanho;
        this.pecas = [];
        for (let i = 0; i < this.tamanho; i++) {
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
        for (let i = 0; i < this.tamanho * 2; i++) {
            let colunas = [];
            for (let j = 0; j < this.tamanho * 2; j++) {
                let img, ocupada = false, tipo = 'vazio';
                if ((i % 2 === 0 & j % 2 === 0) || (i % 2 !== 0 & j % 2 !== 0)) {
                    if (i <= n - 2) {
                        img = ''
                            //+'url(img/pecas/black_queen_crown.png),'
                            + 'url(img/pecas/black_man2.png)'
                            + ',url(img/pecas/espaco_casa.png)';
                        ocupada = true;
                        tipo = 'jogador1';
                    } else if (i > n) {
                        img = ''
                            //+'url(img/pecas/white_queen_crown.png),'
                            + 'url(img/pecas/white_man2.png)'
                            + ',url(img/pecas/espaco_casa.png)';
                        tipo = 'jogador2';
                        ocupada = true;
                    } else {
                        img = 'url(img/pecas/espaco_casa.png)';
                        tipo = 'casa';
                    }
                    colunas[j] = {
                        id: i + '-' + j,
                        pos: {
                            x: j,
                            y: i
                        },
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
                        pos: {
                            x: j,
                            y: i
                        },
                        cor: "secundary",
                        img: 'url(img/pecas/espaco_vazio.png)',
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
        let qtdSelecionada = 0;
        for (let i = 0; i < this.tamanho * 2; i++) {
            for (let j = 0; j < this.tamanho * 2; j++) {
                if (this.pecas[i][j].selecionada &&
                    this.pecas[i][j].tipo !== 'vazio' && this.pecas[i][j] !== peca) {
                    qtdSelecionada++;
                }
            }
        }
        return qtdSelecionada;
    }

    getPecaSelecionda(peca) {
        for (let i = 0; i < this.tamanho * 2; i++) {
            for (let j = 0; j < this.tamanho * 2; j++) {
                if (this.pecas[i][j].selecionada && this.pecas[i][j] !== peca) {
                    return this.pecas[i][j];
                }
            }
        }
    }

    pecasEstaoPerto(peca1, peca2) {
        let id1 = peca1.id.split('-');
        let id2 = peca2.id.split('-');
        id1[0] = parseInt(id1[0]);
        id1[1] = parseInt(id1[1]);
        id2[0] = parseInt(id2[0]);
        id2[1] = parseInt(id2[1]);
        let peca1PodeMoverCima = peca1.tipo !== 'jogador1';
        let peca1PodeMoverBaixo = peca1.tipo !== 'jogador2';
        let estaoPerto = (((id1[0] + 1 === id2[0] && peca1PodeMoverBaixo) //linha abaixo
            || (id1[0] - 1 === id2[0] && peca1PodeMoverCima))//linha acima
            && ((id1[1] + 1 === id2[1])//coluna direita
                || (id1[1] - 1 === id2[1]))); //coluna esquerda
        return estaoPerto;
    }

    EPossivelComer(pecas, peca1, peca2) {
        let id1 = peca1.id.split('-');
        let id2 = peca2.id.split('-');
        id1[0] = parseInt(id1[0]);
        id1[1] = parseInt(id1[1]);
        id2[0] = parseInt(id2[0]);
        id2[1] = parseInt(id2[1]);
        let peca1PodeMoverCima = (peca1.tipo !== 'jogador1');
        let peca1PodeMoverBaixo = (peca1.tipo !== 'jogador2');
        //Abaixo a direita
        let possivelPecaASerComida_b_d = 0;
        try {
            possivelPecaASerComida_b_d = pecas[id1[0] + 1][id1[1] + 1];
            //Abaixo a esquerda
        } catch (err) {
        }
        let possivelPecaASerComida_b_e = 0;
        try {
            possivelPecaASerComida_b_e = pecas[id1[0] + 1][id1[1] - 1];
        } catch (err) {
        }
//Acima a direita
        let possivelPecaASerComida_c_d = 0;
        try {
            possivelPecaASerComida_c_d = pecas[id1[0] - 1][id1[1] + 1];
        } catch (err) {
        }
//Acima a esquerda
        let possivelPecaASerComida_c_e = 0;
        try {
            possivelPecaASerComida_c_e = pecas[id1[0] - 1][id1[1] - 1];
        } catch (err) {
        }
        this.resetPecas();
        let res = false;
        try {
            if (possivelPecaASerComida_b_d.ocupada &&
                (id1[0] + 2 === id2[0])
                && (id1[1] + 2 === id2[1])
                && peca1PodeMoverBaixo
                && peca1.tipo !== pecas[id1[0] + 1][id1[1] + 1].tipo) {
                possivelPecaASerComida_b_d.cor = 'primary';
                possivelPecaASerComida_b_d.img = 'url(img/pecas/espaco_casa.png)';
                possivelPecaASerComida_b_d.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        try {
            if (possivelPecaASerComida_b_e.ocupada && peca1PodeMoverBaixo
                && (id1[0] + 2 === id2[0]) && (id1[1] - 2 === id2[1])
                && peca1.tipo !== pecas[id1[0] + 1][id1[1] - 1].tipo) {
                possivelPecaASerComida_b_e.cor = 'primary';
                possivelPecaASerComida_b_e.img = 'url(img/pecas/espaco_casa.png)';
                possivelPecaASerComida_b_e.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        try {
            if (possivelPecaASerComida_c_d.ocupada &&
                (id1[0] - 2 === id2[0])
                && (id1[1] + 2 === id2[1])
                && peca1PodeMoverCima
                && peca1.tipo !== pecas[id1[0] - 1][id1[1] + 1].tipo) {
                possivelPecaASerComida_c_d.cor = 'primary';
                possivelPecaASerComida_c_d.img = 'url(img/pecas/espaco_casa.png)';
                possivelPecaASerComida_c_d.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        try {
            if (possivelPecaASerComida_c_e.ocupada &&
                (id1[0] - 2 === id2[0])
                && (id1[1] - 2 === id2[1])
                && peca1PodeMoverCima
                && peca1.tipo !== pecas[id1[0] - 1][id1[1] - 1].tipo) {
                possivelPecaASerComida_c_e.cor = 'primary';
                possivelPecaASerComida_c_e.img = 'url(img/pecas/espaco_casa.png)';
                possivelPecaASerComida_c_e.ocupada = false;
                return true;
            }
        } catch (err) {
        }
        return res;
    }

    resetPecas() {
        for (let i = 0; i < this.tamanho * 2; i++) {
            for (let j = 0; j < this.tamanho * 2; j++) {
                this.pecas[i][j].selecionada = false;
            }
        }

    }

    desfocar() {
        let pecas = this.pecas;
        for (let i = 0; i < n * 2; i++) {
            for (let j = 0; j < n * 2; j++) {
                if (pecas[i][j].img === '') {
//                    console.log(pecas[i][j].img);
                    console.log("11111111111111111");
                    pecas[i][j].img = 'url(img/pecas/espaco_casa.png)';
                } else if (pecas[i][j].img.indexOf("casa") !== -1) {
                    console.log("22222222222222");
                    pecas[i][j].img += ',url(img/pecas/espaco_casa.png)';
                } else if (pecas[i][j].img.indexOf("url(img/pecas/espaco_vazio.png)") === -1) {
                    console.log("llllllllllllllll");
                    console.log("Esse não alterou");
                    console.log(i + " " + j);
                    console.log(pecas[i][j].img);
                }
            }
        }
    }
}
