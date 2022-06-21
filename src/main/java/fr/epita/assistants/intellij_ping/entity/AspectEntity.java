package fr.epita.assistants.intellij_ping.entity;

import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.Feature;

import java.util.List;

public abstract class AspectEntity implements Aspect {

    protected Type _type;
    protected List<Feature> _features;

    @Override
    public Type getType() {
        return _type;
    }

    @Override
    public List<Feature> getFeatureList() {
        return _features;
    }
}
