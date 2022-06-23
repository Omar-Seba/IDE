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
    public GitAspect(File directory){
        Git git;
        File gitDirectory = new File(directory + "/.git");
        if(!gitDirectory.isDirectory())
            return;
        try {
             git = Git.open(gitDirectory);
        } catch (IOException e) {
            try {
                Git.init().setDirectory(gitDirectory).call();
                git = Git.open(gitDirectory);
            } catch (Exception exp) {
                throw new MyError("git Aspect", "couldn't init the repository " + exp.getMessage());
            }
        }
        _features = Arrays.asList(new GitPull(git), new GitAdd(git), new GitCommit(git), new GitPush(git));
        _type = Mandatory.Aspects.GIT;
    }

    private static Git initGit(File directory){
        try {
            return Git.init().setDirectory(directory).call();
        } catch (GitAPIException e) {
            throw new MyError("GitAspect", "Impossible to init git" + e.getMessage());
        }
    }
}