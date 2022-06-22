package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;

public class MavenCompile extends MavenFeature {
    public MavenCompile() {
        _type = Mandatory.Features.Maven.COMPILE;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            return mavenExecute(project, "compile", params);
        } catch (MyError e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.COMPILE;
    }
}
