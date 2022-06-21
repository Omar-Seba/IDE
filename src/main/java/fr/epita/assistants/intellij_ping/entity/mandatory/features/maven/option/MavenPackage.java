package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Project;

public class MavenPackage extends MavenFeature {
    public MavenPackage() {
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        return null;
    }
}
