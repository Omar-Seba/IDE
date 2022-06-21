package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Project;

public class MavenCompile extends MavenFeature {
    public MavenCompile() {
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        return null;
    }
}
