package fr.epita.assistants.intellij_ping.Utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class NodeServiceUtils {
    public static void deleteRecursive(File directory) {
        File[] content = directory.listFiles();
        if (content != null) {
            for (File file : content) {
                deleteRecursive(file);
            }
        }
        if (!directory.delete()) {
            throw new MyError("deleteRecursive", "Could not delete " + directory.getAbsolutePath());
        }
    }

    public static void mkdir(File dir) {
        if (!dir.mkdirs()) {
            throw new MyError("mkdir", "Could not create directory " + dir.getAbsolutePath());
        }
    }

    public static void touch_file(File file) {
        try {
            Files.createFile(file.toPath());
        } catch (IOException e) {
            throw new MyError("touch", e.getMessage());
        }
    }

    public static void move_file(Path src, Path dst) {
        try {
            Files.move(src, dst, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new MyError("move", e.getMessage());
        }
    }
}
