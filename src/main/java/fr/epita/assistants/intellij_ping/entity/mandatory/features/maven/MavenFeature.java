package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Project;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

public abstract class MavenFeature extends FeatureEntity {

    protected ExecutionReport mavenExecute(Project project, String arg, Object... params) {
        ArrayList<String> cmdArray = new ArrayList<>(Arrays.asList("mvn", arg));
        cmdArray.addAll(Arrays.stream(params).map(param -> (String) param).toList());
        return () -> runCmd(cmdArray, project);
    }

    private static boolean runProcessBuilder(ProcessBuilder pb){
        try {
            Process process = pb.start();
            process.waitFor();
            return process.exitValue() == 0;
        } catch (IOException | InterruptedException e) {
            throw new MyError("MavenFeature", "could not run maven command");
        }
    }

    private boolean runCmd(ArrayList<String> cmdArray, Project project){
        ProcessBuilder pb = new ProcessBuilder(cmdArray);
        pb.directory(Objects.requireNonNullElseGet(project.getRootNode().getPath().toFile(), () -> new File(System.getProperty("user.dir"))));

        return runProcessBuilder(pb);
    }
}
