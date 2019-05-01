class  Tabuleiro {
    constructor(tamanho) {
        this.tamanho = tamanho;
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
        for (var i = 0; i < this.tamanho; i++) {
            var colunas = [];
            for (var j = 0; j < this.tamanho; j++) {
                if (i % 2 == 0 && j % 2 == 0)
                    colunas[j] = "secundary";
                else
                    colunas[j] = "primary";
            }
            this.pecas[i].linha = colunas;
        }
    }
}