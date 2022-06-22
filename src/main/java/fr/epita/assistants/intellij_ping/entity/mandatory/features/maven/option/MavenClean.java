package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;

public class MavenClean extends MavenFeature {
    public MavenClean() {
        _type = Mandatory.Features.Maven.CLEAN;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            return mavenExecute(project, "clean", params);
        } catch (MyError e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.CLEAN;
    }
}
