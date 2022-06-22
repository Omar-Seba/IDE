package fr.epita.assistants.intellij_ping.entity.mandatory.features.any;

import fr.epita.assistants.intellij_ping.Utils.AnyUtils;
import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;

public class AnyDist extends FeatureEntity {
    public AnyDist() {
        _type = Mandatory.Features.Any.DIST;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        var rootFile = project.getRootNode().getPath().toFile();
        try {
            AnyUtils.cleanUtils(rootFile);
            AnyUtils.createArchive(rootFile);
            return () -> true;
        } catch (MyError e) {
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.DIST;
    }
}
