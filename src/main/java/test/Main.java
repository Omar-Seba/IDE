package test;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.intellij_ping.entity.NodeEntity;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.service.ProjectService;

import java.nio.file.Path;
import java.nio.file.Paths;


public class Main {
    public static void main(String[] args) {
        /*ProjectService projectService = MyIde.init(null);
        Path root = Paths.get("/tmp/test/my-app").toAbsolutePath();
        Project project = projectService.load(root);

        var tmp = project.getFeature(Mandatory.Features.Maven.EXEC).get().execute(project).isSuccess();
        System.out.println(tmp);*/

        /*ProjectService projectService = MyIde.init(null);
        Path root = Paths.get("/tmp/test2").toAbsolutePath();
        Project project = projectService.load(root);

        //System.out.println(projectService.getNodeService().update(project.getRootNode(), 0,5, "Hello".getBytes()).getPath());
        //System.out.println(projectService.getNodeService().delete(new NodeEntity(root)));
        Node createNode = projectService.getNodeService().create(new NodeEntity(root), "lala.txt", Node.Types.FILE);
        Node createNodeFolder = projectService.getNodeService().create(new NodeEntity(root), "otherFolder", Node.Types.FOLDER);
        Node updateNode = projectService.getNodeService().update(createNode, 0,10, "Hello Guys".getBytes());
        System.out.println(updateNode.getPath());
        Node moveNode = projectService.getNodeService().move(updateNode, createNodeFolder);
        System.out.println(moveNode.getPath());*/

        ProjectService projectService = MyIde.init(null);
        Path root = Paths.get("/tmp/test").toAbsolutePath();
        Project project = projectService.load(root);

        //System.out.println(project.getFeature(Mandatory.Features.Git.ADD).get().execute(project, "other").isSuccess());
        //System.out.println(project.getFeature(Mandatory.Features.Git.COMMIT).get().execute(project, "Ici", "on commit", "et ouai.").isSuccess());
        //System.out.println(project.getFeature(Mandatory.Features.Git.PULL).get().execute(project).isSuccess());
    }
}

