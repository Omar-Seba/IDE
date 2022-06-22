package fr.epita.assistants.intellij_ping.Utils;

import java.io.File;
import java.util.List;

public class SearchInfo {
    File file;
    int line;
    String lineRaw;
    String search;
    List<Integer> occurrences;

    public SearchInfo(File file,
                      String search,
                      int line,
                      String lineRaw,
                      List<Integer> occurrences) {
        this.file = file;
        this.search = search;
        this.line = line;
        this.lineRaw = lineRaw;
        this.occurrences = occurrences;
    }
}
