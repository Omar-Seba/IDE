package fr.epita.assistants.intellij_ping.entity.mandatory.features.git;

import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.util.Arrays;
import java.util.List;

public class GitAdd extends GitHandler {
    public GitAdd(Git git) {
        _type = Mandatory.Features.Git.ADD;
        _git = git;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            List<String> args = Arrays.stream(params).map(param -> (String) param).toList();
            for (String arg : args) {
                _git.add().addFilepattern(arg).call();
            }
            return () -> true;
        } catch (GitAPIException e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.ADD;
    }
}
