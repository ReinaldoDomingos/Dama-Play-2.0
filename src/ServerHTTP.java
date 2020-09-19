import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class ServerHTTP {
    ServerSocket server;
    private boolean flag = true;

    public ServerHTTP() {
        try {
            server = new ServerSocket(8080);

            while (flag) {
                Socket socket = server.accept();//Bloqueante
                System.out.println("Aceitou cliente:" + socket);
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
            System.out.println(msg);

            String[] vet = msg.split(" ");
            if (!vet[0].equalsIgnoreCase("GET")) {
                msg = "HTTP/1.1 404 NOt Found\r\n\r\n";
                out.write(msg.getBytes());
            } else {
                String filename = vet[1];
                System.out.println("Arquivo " + filename);
                msg = "HTTP/1.1 200 OK\r\n\r\n";

                FileInputStream fis = new FileInputStream("./resources/" + filename);

                out.write(msg.getBytes());

                for (int i = fis.available(); i > 0; i--) {
                    out.write(fis.read());
                }
            }
            out.flush();
            socket.close();
        } catch (Exception e) {
        }
    }

    public static void main(String[] args) throws IOException {
        ServerHTTP servidor = new ServerHTTP();
        System.in.read();
        servidor.flag = false;
        servidor.server.close();
    }
}
