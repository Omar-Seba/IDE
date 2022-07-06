import React from 'react';
import { useState } from "react";
import './App.css';
import Header from "./components/header-bar/Header";
import FileSystemNavigator from "./components/drawerleft";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import FileScreen from './components/multiScreen/multi-screen';

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

    const [arch, setVisible] = useState(true);
    console.log(arch)

    const deployArch = () => {
        setVisible(arch ? false : true)
    }

    return (

    <div className="App" >
        <Header/>
        <button className='btn' type='button' onClick={deployArch}> files </button>
        <Allotment.Pane preferredSize={200} minSize={120} priority="LOW" snap visible={arch}>
            <FileSystemNavigator collection={treeData}/>
                    <Allotment.Pane vertical preferredSize={200} minSize={120} priority="HIGH" snap visible>
                    <FileScreen/>
                 {/*  here should be the terminal  */}
                    <FileScreen/>
                    </Allotment.Pane>
        </Allotment.Pane>
    </div>
)};


export default App;
