import React from 'react';
import { useState } from "react";
import './App.css';
import Header from "./components/header-bar/Header";
import FileSystemNavigator from "./components/drawerleft";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import TextEditor from "./components/text-editor/TextEditor"

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

const App = () => {

    const [panes, setPanes] = useState([0, 1, 2]);

    return (

    <div className="App" >
        <Header/>
        <Allotment>
            <Allotment.Pane preferredSize={200} minSize={120} priority="HIGH" snap visible
            >
                <FileSystemNavigator collection={treeData}/>
            </Allotment.Pane>
            <Allotment.Pane
            minSize={200}
            priority="HIGH"
            snap
            visible
            > 
                    
                    <div className="container" >
                
                <Allotment minSize={200}>
                    
                    <Allotment.Pane
                    minSize={200}>
                    
                    <Allotment>
                        
                        {panes.map((pane) => (
                        
                        <Allotment.Pane key={pane}>
                            
                            <TextEditor/>
                            
                            <div>
                                <div style={{ position: "absolute", top: 0, right: 0 }}>
                                    <button className='btn'
                                    type="button"
                                    onClick={() =>
                                        setPanes((panes) => {
                                            const newPanes = [...panes];
                                        newPanes.splice(pane, 1);
                                        return newPanes;
                                    })}>
                                    x
                                    </button>
                                </div>
                            </div>
                        </Allotment.Pane>
                        ))}
                    </Allotment>
                    </Allotment.Pane>
                </Allotment>
                </div>
            </Allotment.Pane>
            
        </Allotment>
    </div>
)};


export default App;
