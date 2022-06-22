package fr.epita.assistants.intellij_ping.entity.mandatory.features.git;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

public class GitPush extends GitHandler {
    public GitPush(Git git) {
        _type = Mandatory.Features.Git.PUSH;
        _git = git;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            _git.push().call();
            return () -> true;
        } catch (GitAPIException e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.PUSH;
    }
}
