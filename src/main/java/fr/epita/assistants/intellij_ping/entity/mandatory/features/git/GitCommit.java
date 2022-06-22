package fr.epita.assistants.intellij_ping.entity.mandatory.features.git;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.util.Arrays;

public class GitCommit extends GitHandler {
    public GitCommit(Git git) {
        _type = Mandatory.Features.Git.COMMIT;
        _git = git;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            _git.commit().setMessage(Arrays.toString(params)).call();
            return () -> true;
        } catch (GitAPIException e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.COMMIT;
    }
}
