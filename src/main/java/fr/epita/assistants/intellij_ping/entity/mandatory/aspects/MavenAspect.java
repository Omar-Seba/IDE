package fr.epita.assistants.intellij_ping.entity.mandatory.aspects;

import fr.epita.assistants.intellij_ping.entity.AspectEntity;
import fr.epita.assistants.intellij_ping.entity.mandatory.features.maven.option.*;
import fr.epita.assistants.myide.domain.entity.Mandatory;

import java.util.List;

public class MavenAspect extends AspectEntity {
    public MavenAspect() {
        _features = List.of(
                new MavenCompile(),
                new MavenClean(),
                new MavenTest(),
                new MavenPackage(),
                new MavenInstall(),
                new MavenExec(),
                new MavenTree());
        _type = Mandatory.Aspects.MAVEN;
    }
}
