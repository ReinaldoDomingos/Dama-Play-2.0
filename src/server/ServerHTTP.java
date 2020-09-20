package server;

import dama.JogoDama;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.Integer.parseInt;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

public class ServerHTTP {
    ServerSocket server;
    JogoDama jogoDama;
    private boolean flag = true;

    public ServerHTTP() {
        try {
            server = new ServerSocket(8080);
            jogoDama = new JogoDama();

            while (flag) {
                Socket socket = server.accept();//Bloqueante
//                System.out.println("Aceitou cliente:" + socket);
                new Thread(() -> atendeRequisicao(socket)).start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(server);
    }

    private void atendeRequisicao(Socket socket) {
        try {
            DataOutputStream out = new DataOutputStream(socket.getOutputStream());
            DataInputStream in = new DataInputStream(socket.getInputStream());

            // Inicia comunicação
            Scanner sc = new Scanner(in);

            String msg = sc.nextLine();

            String[] vet = msg.split(" ");
            if (!vet[0].equalsIgnoreCase("GET")) {
                msg = "HTTP/1.1 404 NOt Found\r\n\r\n";
                out.write(msg.getBytes());
            } else {
                String request = vet[1];

                String searchSession = "/sessionId/";
                String searchZerar = "/zerarJogo";
                String searchConferir = "/conferirUsuario?sessionId=";
                String searchPodeMoverPeca = "/possoMoverPeca?sessionId=";
                String searchMoverPeca = "/moverPeca?sessionId=";
                String searchAlteracoes = "/alteracoes?sessionId=";
                if (request.contains(searchAlteracoes) && jogoDama.isPartidaIniciada()) {
                    int sessionId = parseInt(getSessionId(request, searchAlteracoes));
                    if (isNull(jogoDama.getJogadorUltimasAlteracoes()) || jogoDama.getJogadorUltimasAlteracoes().getNumero() == sessionId)
                        return;

                    String ultimasAlteracoes = jogoDama.getUltimasAlteracoes();
                    if (nonNull(ultimasAlteracoes)) {
                        System.out.println("alteracoes");
                        msg = gerarMensagem(200, ultimasAlteracoes);
                        out.write(msg.getBytes());
                        jogoDama.zerarUltimasAlteracoes();
                    }
                } else if (request.contains(searchMoverPeca) && jogoDama.isPartidaIniciada()) {
                    String searchPosInicial = "posInicial=[";
                    String searchPosFinal = "posFinal=[";

                    int i = request.indexOf(searchMoverPeca);
                    int f = request.indexOf(searchPosInicial) - 1;
                    String sessionId = request.substring(i + searchMoverPeca.length(), f);

                    String[] req = request.substring(i + searchMoverPeca.length()).split("&");
                    String posInicial = req[1].replace(searchPosInicial, "").replace("]", "");
                    String posFinal = req[2].replace(searchPosFinal, "").replace("]", "");

//                    System.out.println("MoverPeca " + sessionId);
//                    System.out.println("posInicial " + posInicial);
//                    System.out.println("posFinal " + posFinal);
//                    System.out.println();

                    jogoDama.moverPeca(Integer.parseInt(sessionId), posInicial, posFinal);
                } else if (request.contains(searchPodeMoverPeca) && jogoDama.isPartidaIniciada()) {
                    String sessionId = getSessionId(request, searchPodeMoverPeca);
//                    System.out.println("possoMoverPeca " + sessionId);
                    boolean jogadorPodeMoverPeca = jogoDama.jogadorPodeMoverPeca(parseInt(sessionId));

                    msg = gerarMensagem(200, "{\"podeMoverPeca\":" + jogadorPodeMoverPeca + "}");
                    out.write(msg.getBytes());
                } else if (request.contains(searchZerar)) {
//                    System.out.println("zerando....");
                    jogoDama = new JogoDama();
                } else if (request.contains(searchConferir)) {
//                    System.out.println(request);
//                    System.out.println("conferirUsuario");
                    String sessionId = getSessionId(request, searchConferir);
//                    System.out.println("sessionId " + sessionId);
                    if (!sessionId.equals("undefined") && (isNull(jogoDama.getJogador(parseInt(sessionId))))
                            || (parseInt(sessionId) == 1 && isNull(jogoDama.getJogador(2)))
                            || (parseInt(sessionId) == 2 && isNull(jogoDama.getJogador(1)))) {
                        iniciarPartida(out);
                    }
                } else if (request.contains(searchSession)) {
//                    System.out.println(request);

                    String sessionId = request.split(searchSession)[1];
//                    System.out.println("sessionId " + sessionId);
                    getPaginaInicial(out);
                } else if (request.contains("/index") || request.equals("/")) {
                    getPaginaInicial(out);
                } else if (isFile(request)) {
                    getArquivoServidor(out, request);
                } else if (request.equals("/iniciarPartida")) {
//                    System.out.println(request);

                    iniciarPartida(out);
                }
            }
            enviarResposta(socket, out);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getSessionId(String request, String search) {
        return request.replace(search, "");
    }

    private void iniciarPartida(DataOutputStream out) throws IOException {
        String msg;
//        System.out.println("Iniciando partida");
        if (isNull(jogoDama.getJogador(1))) {
            String response = jogoDama.criarJogador(1);
            msg = gerarMensagem(200, response);
            System.out.println("Jogador " + response + " online");
        } else if (isNull(jogoDama.getJogador(2))) {
            String response = jogoDama.criarJogador(2);
            msg = gerarMensagem(200, response);
            System.out.println("Jogador " + response + " online");
        } else {
            msg = gerarMensagem(500, "{\"msg\":\"Aguarde os jogadores atuais terminarem\"}");
        }
        out.write(msg.getBytes());
    }

    private void enviarResposta(Socket socket, DataOutputStream out) throws IOException {
        out.flush();
        socket.close();
//        System.out.println("-----------------------------------------");
    }

    private void getPaginaInicial(DataOutputStream out) throws IOException {
        String filename = "/index.html";
        getArquivoServidor(out, filename);
    }

    private String gerarMensagem(int code, String response) {
        String msg = "HTTP/1.1 " + code + " ";

        switch (code) {
            case 200:
                msg += EHttpStatus.OK + "\r\n\r\n" + response;
                break;
            case 500:
                msg += EHttpStatus.INTERNAL_ERROR + "\r\n\r\n" + response;
                break;
        }
        return msg;
    }

    private void getArquivoServidor(DataOutputStream out, String filename) throws IOException {
        String msg = "HTTP/1.1 200 OK\r\n\r\n";

        FileInputStream fis = new FileInputStream("./resources/" + filename);

        out.write(msg.getBytes());

        for (int i = fis.available(); i > 0; i--) {
            out.write(fis.read());
        }
    }

    public static boolean isFile(String str) {
        String regex = "([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp|js|css|html))$)";

        Pattern p = Pattern.compile(regex);

        if (str == null) {
            return false;
        }

        Matcher m = p.matcher(str);

        return m.matches();
    }

    public static void main(String[] args) throws IOException {
        ServerHTTP servidor = new ServerHTTP();
        System.in.read();
        servidor.flag = false;
        servidor.server.close();
    }
}
