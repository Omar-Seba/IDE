package fr.epita.assistants.intellij_ping.entity.mandatory.aspects;

import fr.epita.assistants.intellij_ping.entity.AspectEntity;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.git.*;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import org.eclipse.jgit.api.Git;

import java.io.File;
import java.util.Arrays;

public class GitAspect extends AspectEntity {
    public GitAspect(File directory) {
        _features = Arrays.asList(new GitPull(), new GitAdd(), new GitCommit(), new GitPush());
        _type = Mandatory.Aspects.GIT;
        initGit(directory);
    }

    private void initGit(File directory){
        Git.init().setDirectory(directory);
    }
}