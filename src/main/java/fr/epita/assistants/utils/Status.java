package fr.epita.assistants.utils;
import fr.epita.assistants.myide.domain.entity.Feature;

public class Status {
    public static Feature.ExecutionReport fail(){
        return () -> false;
    }

    public static Feature.ExecutionReport ok(){
        return () -> true;
    }
}
