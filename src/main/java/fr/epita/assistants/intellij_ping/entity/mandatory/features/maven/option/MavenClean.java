package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Project;

public class MavenClean extends MavenFeature {
    public MavenClean() {
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        return mavenExecute(project, "clean", params);
    }
}
