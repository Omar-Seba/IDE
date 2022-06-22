package fr.epita.assistants.intellij_ping.Utils;


import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;



public class AnyUtils {

    public static void cleanUtils(File root) {
        try {
            Path path = Paths.get(root.getPath(), ".myideignore");
            if (Files.exists(path)) {

                    List<String> trash = Files.readAllLines(path, StandardCharsets.UTF_8).stream()
                            .map(filename -> filename.replaceAll("\\*", ".*")).toList();
                    deleteAll(trash, root);
                }
            }catch (IOException e) {
            throw new MyError("AnyUtils cleanup", e.getMessage());
        }
    }

    public static void createArchive(File root) {
        try {
            Path archivePath = Paths.get(root.getParentFile().getAbsolutePath(), root.getName() + ".zip");
            File archive = archivePath.toFile();
            FileOutputStream fileStream = new FileOutputStream(archive);
            ZipOutputStream zipStream = new ZipOutputStream(fileStream);
            File file = new File(root.getPath());
            createArchiveRec(file, zipStream, file.getName());
            zipStream.close();
            fileStream.close();
        }
        catch (IOException e) {
            throw new MyError("anyUtils zip", e.getMessage());
        }
    }

    public static List<SearchInfo> search(File root, String searchString) {
        File[] files = root.listFiles();
        Stream<File> fileStream = files == null ? Stream.empty() : Arrays.stream(files);
        return fileStream.map(child -> {
            if (child.isDirectory()) {
                return search(child, searchString);
            }
            return searchInFile(child, searchString);
        }).flatMap(List::stream).collect(Collectors.toList());
    }
    private static boolean checkRec(List<String> toDelete, String filename, boolean isDirectory) {
        for (String pattern : toDelete) {
            if (pattern.endsWith("/")) {
                if (isDirectory && filename.matches(pattern.substring(0, pattern.length() - 1))) {
                    return true;
                }
            }
            else if (filename.matches(pattern)) {
                return true;
            }
        }
        return false;
    }

    private static void deleteAll(List<String> toDelete, File current) {
        if (checkRec(toDelete, current.getName(), current.isDirectory())) {
            NodeServiceUtils.deleteRecursive(current);
        } else {
            File[] files = current.listFiles();
            Stream<File> fileStream = files == null ? Stream.empty() : Arrays.stream(files);
            fileStream.forEach(file -> deleteAll(toDelete, file));
        }
    }


    private static void createArchiveRec(File file, ZipOutputStream recursion, String fileName) throws IOException {
        if (file.isDirectory()) {

            recursion.putNextEntry(new ZipEntry(fileName + (fileName.endsWith("/") ? "" : "/")));
            recursion.closeEntry();
            File[] children = file.listFiles();
            assert children != null;
            for (File childFile : children) {
                createArchiveRec(childFile, recursion, fileName + "/" + childFile.getName());
            }
        } else {
            FileInputStream fileStream = new FileInputStream(file);
            ZipEntry zipEntry = new ZipEntry(fileName);
            recursion.putNextEntry(zipEntry);
            byte[] bytes = new byte[1024];
            int length;
            while ((length = fileStream.read(bytes)) >= 0) {
                recursion.write(bytes, 0, length);
            }
            fileStream.close();
        }
    }

    private static List<Integer> getOccurrencesInLine(String line, String searchString) {
        List<Integer> startIndices = new ArrayList<>();
        int searchStringLength = searchString.length();
        int searchFrom = 0;
        int index;
        while ((index = line.indexOf(searchString, searchFrom)) != -1) {
            startIndices.add(index);
            searchFrom = index + searchStringLength;
        }
        return startIndices;
    }

    private static List<SearchInfo> searchInFile(File file, String searchString) {
        List<SearchInfo> searchResults = new ArrayList<>();
        String searchStringLowerCase = searchString.toLowerCase();
        try {
            final Scanner scanner = new Scanner(file);
            int lineNumber = 1;
            while (scanner.hasNextLine()) {
                final String line = scanner.nextLine();
                final String lineLowerCase = line.toLowerCase();
                List<Integer> startIndices = getOccurrencesInLine(lineLowerCase, searchStringLowerCase);
                if (!startIndices.isEmpty()) {
                    searchResults.add(new SearchInfo(file, line, lineNumber, searchString, startIndices));
                }
                lineNumber++;
            }
        } catch (FileNotFoundException e) {
            throw new MyError("any Utils search in files", e.getMessage());
        }
        return searchResults;
    }

}
