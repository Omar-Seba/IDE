package fr.epita.assistants.intellij_ping.entity.mandatory.features.any;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Project;

public class AnyDist extends FeatureEntity {
    public AnyDist() {
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        return null;
    }
}
