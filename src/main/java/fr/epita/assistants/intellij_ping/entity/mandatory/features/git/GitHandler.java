package fr.epita.assistants.intellij_ping.entity.mandatory.features.git;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Project;
import org.eclipse.jgit.api.Git;

public abstract class GitHandler extends FeatureEntity {
    protected Git _git;

    @Override
    public abstract ExecutionReport execute(Project project, Object... params);

    private Git getGit(){
        return _git;
    }
}
