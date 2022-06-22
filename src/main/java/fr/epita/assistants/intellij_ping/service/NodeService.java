package fr.epita.assistants.intellij_ping.service;

import com.google.common.primitives.Bytes;
import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.NodeEntity;
import fr.epita.assistants.myide.domain.entity.Node;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

import static fr.epita.assistants.intellij_ping.Utils.NodeServiceUtils.*;
import static org.apache.commons.io.FileUtils.*;

public class NodeService implements fr.epita.assistants.myide.domain.service.NodeService {
    @Override
    public Node update(Node node, int from, int to, byte[] insertedContent) {
        try {
            if (node.isFolder())
                return node;

            File file = new File(node.getPath().toString());

            byte[] bytes = readFileToByteArray(file);
            for (int i = from, j = 0; i < to; i++, j++) {
                if (i == bytes.length){
                    bytes = Arrays.copyOf(bytes, to);
                }
                bytes[i] = insertedContent[j];
            }

            FileWriter overwriteFile = new FileWriter(file, false);
            overwriteFile.write(new String(bytes, StandardCharsets.UTF_8));
            overwriteFile.close();

        } catch (ArrayIndexOutOfBoundsException e) {
            throw new MyError("NodeService","insertedContent length upper to variable \"to\"");
        } catch (FileNotFoundException e) {
            throw new MyError("NodeService","file not find");
        } catch (IOException e) {
            throw new MyError("NodeService","doesn't load the bytes array with the file");
        }

        return node;
    }

    @Override
    public boolean delete(Node node) {
        try {
            deleteRecursive(new File(node.getPath().toString()));
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }

    @Override
    public Node create(Node folder, String name, Node.Type type) {
        File newFile = new File(folder.getPath().toString(), name);
        if (type == Node.Types.FILE) {
            touch_file(newFile);
            return new NodeEntity(newFile.toPath());
        }
        mkdir(newFile);
        return new NodeEntity(newFile.toPath());
    }

    @Override
    public Node move(Node nodeToMove, Node destinationFolder) {
        var srcPath = nodeToMove.getPath();
        var dstPath = Paths.get(destinationFolder.getPath().toString(), srcPath.getFileName().toString());
        move_file(srcPath, dstPath);
        return new NodeEntity(dstPath);
    }
}
