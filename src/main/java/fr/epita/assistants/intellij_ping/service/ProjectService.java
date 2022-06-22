package fr.epita.assistants.intellij_ping.service;

import fr.epita.assistants.intellij_ping.entity.ProjectEntity;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.service.NodeService;
import org.apache.commons.lang3.NotImplementedException;

import java.nio.file.Path;
import java.util.Optional;

public class ProjectService implements fr.epita.assistants.myide.domain.service.ProjectService {

    NodeService nodeService = new fr.epita.assistants.intellij_ping.service.NodeService();

    @Override
    public Project load(Path root) {
        return new ProjectEntity(root);
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Feature.Type featureType, Object... params) {
        Optional<Feature> feature = project.getFeature(featureType);
        return feature.isEmpty() ?  () -> false : feature.get().execute(project, params);
    }

    @Override
    public NodeService getNodeService() {
        return nodeService;
    }
}
