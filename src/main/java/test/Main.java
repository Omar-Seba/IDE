package test;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.service.ProjectService;

import java.nio.file.Path;
import java.nio.file.Paths;


public class Main {
    public static void main(String[] args) {
        ProjectService projectService = MyIde.init(null);
        Path root = Paths.get("/tmp/test/my-app").toAbsolutePath();
        Project project = projectService.load(root);

        var tmp = project.getFeature(Mandatory.Features.Maven.EXEC).get().execute(project).isSuccess();
        System.out.println(tmp);
    }
}


/* */