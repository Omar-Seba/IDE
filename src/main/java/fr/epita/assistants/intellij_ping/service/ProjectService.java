package fr.epita.assistants.intellij_ping.service;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.service.NodeService;

import java.nio.file.Path;

public class ProjectService implements fr.epita.assistants.myide.domain.service.ProjectService {


    @Override
    public Project load(Path root) {
        return null;
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Feature.Type featureType, Object... params) {
        return null;
    }

    @Override
    public NodeService getNodeService() {
        return null;
    }
}
