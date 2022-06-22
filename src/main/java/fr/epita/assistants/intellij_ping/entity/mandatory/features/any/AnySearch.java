package fr.epita.assistants.intellij_ping.entity.mandatory.features.any;

import fr.epita.assistants.intellij_ping.Utils.AnyUtils;
import fr.epita.assistants.intellij_ping.Utils.MyError;
import fr.epita.assistants.intellij_ping.entity.FeatureEntity;
import fr.epita.assistants.intellij_ping.entity.mandatory.aspects.AnyAspect;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;

public class AnySearch extends FeatureEntity {
    public AnySearch() {
        _type = Mandatory.Features.Any.SEARCH;

    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        Node node = project.getRootNode();
        String str = params[0].toString();
        try {
            var tmp = AnyUtils.search(node.getPath().toFile(), str);
            AnyAspect.searchInfo = tmp;
            return () -> tmp.size() > 0;
        } catch (MyError e) {
           return () -> false;
        }

    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.SEARCH;
    }
}
