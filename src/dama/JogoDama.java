package dama;

public class JogoDama {
    private Jogador jogador1;
    private Jogador jogador2;

    public Jogador getJogador(int numero) {
        if (numero == 1) {
            return jogador1;
        } else if (numero == 2) {
            return jogador2;
        }

        return null;
    }

    public String criarJogador(int numero) {
        if (numero == 1) {
            this.jogador1 = new Jogador(1);
            System.out.println("jogador1 criado");
        } else if (numero == 2) {
            this.jogador2 = new Jogador(2);
            System.out.println("jogador2 criado");
        }

        return "{\"jogador\": " + numero + "}";
    }


    public String criarJogador2() {
        return "{\"jogador\": 2}";
    }
}
