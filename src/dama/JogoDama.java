package dama;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

public class JogoDama {
    private Jogador jogador1;
    private Jogador jogador2;
    private Jogador jogadorAtual;
    private boolean partidaIniciada;

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

        if (nonNull(jogador1) && nonNull(jogador2)) {
            partidaIniciada = true;
        }

        return "{\"jogador\": " + numero + "}";
    }

    public boolean isPartidaIniciada() {
        return partidaIniciada;
    }

    public boolean jogadorPodeMoverPeca(int numeroJogador) {
        if (isNull(jogadorAtual)) {
            int sorteio = (Math.random() * 2) < 1 ? 1 : 2;

            if (sorteio == 1) {
                jogadorAtual = jogador1;
            } else {
                jogadorAtual = jogador2;
            }
        }

        return (jogadorAtual.equals(jogador1) && numeroJogador == 1) ||
                (jogadorAtual.equals(jogador2) && numeroJogador == 2);
    }
}
