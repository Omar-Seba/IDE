package fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option;

import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.MavenFeature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.utils.Status;
import org.apache.commons.lang3.NotImplementedException;

public class MavenTest extends MavenFeature {
    public MavenTest() {
        _type = Mandatory.Features.Maven.TEST;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            return mavenExecute(project, "test", params);
        } catch (MyError e) {
            throw new NotImplementedException("error");
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.TEST;
    }
}
