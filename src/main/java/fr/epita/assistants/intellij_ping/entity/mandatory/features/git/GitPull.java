package fr.epita.assistants.intellij_ping.entity.mandatory.features.git;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.MergeCommand;
import org.eclipse.jgit.api.errors.GitAPIException;

public class GitPull extends GitHandler {
    public GitPull(Git git) {
        _type = Mandatory.Features.Git.PULL;
        _git = git;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            _git.pull().setFastForward(MergeCommand.FastForwardMode.FF).call();
            return () -> true;
        } catch (GitAPIException e) {
            e.printStackTrace();
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.PULL;
    }
}
