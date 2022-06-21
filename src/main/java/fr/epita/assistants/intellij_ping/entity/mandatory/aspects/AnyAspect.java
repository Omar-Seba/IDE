package fr.epita.assistants.intellij_ping.entity.mandatory.aspects;

import fr.epita.assistants.intellij_ping.entity.AspectEntity;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.any.*;
import fr.epita.assistants.myide.domain.entity.Mandatory;

import java.util.Arrays;

public class AnyAspect extends AspectEntity {
    public AnyAspect() {
        _features = Arrays.asList(new AnyCleanup(), new AnyDist(), new AnySearch());
        _type = Mandatory.Aspects.ANY;
    }
}