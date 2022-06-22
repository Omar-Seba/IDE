package fr.epita.assistants.intellij_ping.Utils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static java.nio.file.Files.readAllLines;

public class AnyUtils {

    public static void cleanup(File root) {
        try {
            Path ignoreFile = Paths.get(root.getPath(), ".myideignore");
            if (Files.exists(ignoreFile)) {
                List<String> toDelete = readAllLines(ignoreFile);
                toDelete = toDelete.stream().map(filename -> filename.replaceAll("\\*", ".*")).toList();
                ignoreRecursively(toDelete, root);
            }
        }
        catch (IOException e){
            throw new MyError("Cleanup", "Impossible to read the lines on the file .myideignore");
        }
    }

}
