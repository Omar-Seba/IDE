package fr.epita.assistants.intellij_ping.entity;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.myide.domain.entity.Node;


import javax.validation.constraints.NotNull;
import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class NodeEntity implements Node {
    protected Path _path;
    protected Type _type;

    public NodeEntity(Path _path) {
        this._path = _path;
        this._type = getType();
    }

    @Override
    public Path getPath() {
        return _path;
    }

    @Override
    public Type getType(){
        File file = new File(_path.toString());

        if (file.exists()) return Types.FILE;
        if (file.isDirectory()) return Types.FOLDER;

        throw new MyError("NodeEntity", "getType() : wasn't able to find type of the path");
    }

    private static List<@NotNull Node> getChildrenRec(Node node)  {
        List<Node> listNode = new ArrayList<>();

        if (!(node.isFolder()))
        {
            listNode.add(node);
            return listNode;
        }
        else {
            File directoryPath = new File(node.getPath().toString());
            String[] contents = directoryPath.list();
            assert contents != null;
            for (String content : contents) {
                Path currentPath = Path.of(content);
                NodeEntity nodeEntity = new NodeEntity(currentPath);
                listNode.add(nodeEntity);
                listNode.addAll(getChildrenRec(nodeEntity));
            }
        }

        return listNode;
    }

    @Override
    public List<@NotNull Node> getChildren() {
        //FIXME: for now return all the subfiles and subdirectories recursively ...
        List<@NotNull Node> nodeList = new ArrayList<>();

        if (!isFolder())
            return Collections.emptyList();
        else {
            File directoryPath = new File(_path.toString());
            String[] contents = directoryPath.list();
            assert contents != null;
            for (String content : contents) {
                Path currentPath = Path.of(content);
                nodeList.addAll(getChildrenRec(new NodeEntity(currentPath)));
            }
        }

        return nodeList;
    }

    @Override
    public boolean isFile() {
        return Node.super.isFile();
    }

    @Override
    public boolean isFolder() {
        return Node.super.isFolder();
    }
}