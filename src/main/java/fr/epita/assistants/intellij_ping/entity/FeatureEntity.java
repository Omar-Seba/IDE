package fr.epita.assistants.intellij_ping.entity;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;

public abstract class FeatureEntity implements Feature {

    protected Type _type;

    @Override
    public abstract ExecutionReport execute(Project project, Object... params);

    @Override
    public Type type() {
        return _type;
    }
}
