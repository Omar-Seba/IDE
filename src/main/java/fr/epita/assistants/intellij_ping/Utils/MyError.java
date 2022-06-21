package fr.epita.assistants.intellij_ping.Utils;

public class MyError extends RuntimeException {
    public MyError(String file, String error) {
        System.out.println("Exception on the file : " + file + ",with the message : " + error);
    }
}
