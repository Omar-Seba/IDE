package fr.epita.assistants.intellij_ping.entity.mandatory.aspects;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.AspectEntity;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.git.*;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

public class GitAspect extends AspectEntity {
    public GitAspect(File directory) {
        try {
            Git git = Git.open( new File( directory + "/.git" ) );

            _features = Arrays.asList(new GitPull(git), new GitAdd(git), new GitCommit(git), new GitPush(git));
            _type = Mandatory.Aspects.GIT;
        } catch (IOException e) {
            throw new MyError("GitAspect", "Impossible to open the git");
        }
    }

    private static Git initGit(File directory){
        try {
            return Git.init().setDirectory(directory).call();
        } catch (GitAPIException e) {
            throw new MyError("GitAspect", "Impossible to init git");
        }
    }
}