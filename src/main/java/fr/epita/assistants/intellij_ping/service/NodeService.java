package fr.epita.assistants.intellij_ping.service;

import fr.epita.assistants.myide.domain.entity.Node;

import java.io.File;

public class NodeService implements fr.epita.assistants.myide.domain.service.NodeService {
    @Override
    public Node update(Node node, int from, int to, byte[] insertedContent) {
        if (node.isFolder())
            return node;

        File file = new File(node.getPath().toString());
        return null;
    }

    @Override
    public boolean delete(Node node) {
        return false;
    }

    @Override
    public Node create(Node folder, String name, Node.Type type) {
        return null;
    }

    @Override
    public Node move(Node nodeToMove, Node destinationFolder) {
        return null;
    }
}
