import React from 'react';
import './App.css';
import Header from "./components/header-bar/Header";
import FileSystemNavigator from "./components/drawerleft";

const treeData = [
    {
        key: "0-0",
        name: "Documents",
        icon: "fa fa-folder",
        title: "Documents Folder",
        children: [
            {
                key: "0-1",
                name: "Document 0-1",
                icon: "fa fa-folder",
                title: "Documents Folder",
                children: [
                    {
                        key: "0-1-1",
                        name: "Document-0-1.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                    {
                        key: "0-1-2",
                        name: "Document-0-2.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                    {
                        key: "0-1-3",
                        name: "Document-0-3.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                    {
                        key: "0-1-4",
                        name: "Document-0-4.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                ],
            },
        ],
    },
    {
        key: "1",
        name: "Desktop",
        icon: "fa fa-desktop",
        title: "Desktop Folder",
        children: [
            {
                key: "1-0",
                name: "document1.doc",
                icon: "fa fa-file",
                title: "Documents Folder",
            },
            {
                key: "1-2",
                name: "documennt-2.doc",
                icon: "fa fa-file",
                title: "Documents Folder",
            },
        ],
    },
    {
        key: "2",
        name: "Downloads",
        icon: "fa fa-download",
        title: "Downloads Folder",
        children: [],
    },
]

function App() {
    return (
        <div className="App">
            <Header/>
            <FileSystemNavigator collection={treeData}/>
        </div>
    );
}

export default App;
