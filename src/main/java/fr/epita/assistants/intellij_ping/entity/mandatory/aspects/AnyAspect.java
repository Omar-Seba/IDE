package fr.epita.assistants.intellij_ping.entity.mandatory.aspects;

import fr.epita.assistants.intellij_ping.Utils.SearchInfo;
import fr.epita.assistants.intellij_ping.entity.AspectEntity;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.any.*;
import fr.epita.assistants.myide.domain.entity.Mandatory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AnyAspect extends AspectEntity {
    public static List<SearchInfo> searchInfo = new ArrayList<>();


    public AnyAspect() {
        _features = Arrays.asList(new AnyCleanup(), new AnyDist(), new AnySearch());
        _type = Mandatory.Aspects.ANY;
    }
}