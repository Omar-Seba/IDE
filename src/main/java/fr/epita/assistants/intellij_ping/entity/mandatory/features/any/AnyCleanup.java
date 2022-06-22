package fr.epita.assistants.intellij_ping.entity.mandatory.features.any;

import fr.epita.assistants.intellij_ping.Utils.AnyUtils;
import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;

public class AnyCleanup extends FeatureEntity {
    public AnyCleanup() {
        _type = Mandatory.Features.Any.CLEANUP;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            AnyUtils.cleanUtils(project.getRootNode().getPath().toFile());
            return () -> true;
        } catch (MyError e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.CLEANUP;
    }
}
