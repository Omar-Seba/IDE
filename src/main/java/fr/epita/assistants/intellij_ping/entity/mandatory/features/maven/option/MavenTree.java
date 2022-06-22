package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.utils.Status;

public class MavenTree extends MavenFeature {
    public MavenTree() {
        _type = Mandatory.Features.Maven.TREE;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            return mavenExecute(project, "dependency:tree", params);
        } catch (MyError e) {
            return Status.fail();
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.TREE;
    }
}
