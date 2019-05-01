var n = 0;
$(document).ready(function () {
    var w = $("button").css('width');
    w = w.substring(0, w.indexOf('px'));
    if (n == 5)
        $("button").css('width', (w * 1.5) + "px");
    else if (n == 4)
        $("button").css('width', (w * 2) + "px");
    $('.decimo').css('height', $("button").css('width'));
    $('button').css('height', $("button").css('width'));
//    $('button').css('width', $(".decimo").css('width'));
//    var h = $(".decimo").css('width');
//    h = h.substring(0, h.indexOf('px'));
//    $('.jumbotron').css('height', h + 'px');
});
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
    preencherPecas() {
        for (var i = 0; i < this.tamanho * 2; i++) {
            var colunas = [];
            for (var j = 0; j < this.tamanho * 2; j++) {
                var img;
                if ((i % 2 == 0 & j % 2 == 0) || (i % 2 != 0 & j % 2 != 0)) {
                    if (i <= n - 2) {
                        img = 'url(img/peca_jogador_1.png)'
                    } else if (i > n) {
                        img = 'url(img/peca_jogador_2.png)';
                    } else {
                        img = 'url(img/espaco_casa.png)';
                    }
                    colunas[j] = {
                        cor: "primary",
                        img: img,
                        selecionada: false,
                        ocupada: false
                    }
                } else {
                    colunas[j] = {
                        cor: "secundary",
                        img: 'url(img/espaco_vazio.png)',
                        selecionada: false,
                        ocupada: false
                    };
//                    (i % 2 != 0 && j % 2 == 0)
                }
            }
            this.pecas[i] = colunas;
        }
    }
}
