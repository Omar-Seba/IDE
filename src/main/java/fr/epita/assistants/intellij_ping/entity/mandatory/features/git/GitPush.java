package fr.epita.assistants.intellij_ping.entity.mandatory.features.git;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Project;

public class GitPush extends FeatureEntity {
    public GitPush() {
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        return null;
    }
}
