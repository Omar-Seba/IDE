package fr.epita.assistants.intellij_ping.entity;

import fr.epita.assistants.intellij_ping.entity.mandatory.aspects.AnyAspect;
import fr.epita.assistants.intellij_ping.entity.mandatory.aspects.GitAspect;
import fr.epita.assistants.intellij_ping.entity.mandatory.aspects.MavenAspect;
import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;

import javax.validation.constraints.NotNull;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class ProjectEntity implements Project {

    protected NodeEntity rootNode;
    protected Set<Aspect> aspectSet;

    public ProjectEntity(Path path) {
        this.rootNode = new NodeEntity(path);
        this.aspectSet = FillTheSet();
    }

    private Set<Aspect> FillTheSet() {
        Set<Aspect> aspectSet = new HashSet<>();
        aspectSet.add(new AnyAspect());
        String rootPath = rootNode.getPath().toString();
        var Path= Paths.get(rootPath, "pom.xml");

        if (Files.exists(Path)) {
            aspectSet.add(new MavenAspect());
        }
        Path = Paths.get(rootPath, ".git");
        if (Files.exists(Path) && Files.isDirectory(Path)) {
            aspectSet.add(new GitAspect(this.getRootNode().getPath().toFile()));
        }
        return aspectSet;
    }

    @Override
    public Node getRootNode() {
        return rootNode;
    }

    @Override
    public Set<Aspect> getAspects() {
        return aspectSet;
    }

    @Override
    public Optional<Feature> getFeature(Feature.Type featureType) {
        return getFeatures().stream().filter(feature -> feature.type() == featureType).findAny();
    }

    @Override
    public List<@NotNull Feature> getFeatures() {
        return Project.super.getFeatures();
    }
}
