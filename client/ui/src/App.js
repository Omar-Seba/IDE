import React from 'react';
import { useState } from "react";
import './App.css';
import Header from "./components/header-bar/Header";
import FileSystemNavigator from "./components/drawerleft";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import FileScreen from './components/multiScreen/multi-screen';
import axios from 'axios'
const body = {
    path : "/home/mrseven7/ing1/C"
}

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



var dataTree;

console.log("herer")
const postPath = async () => {
    // const req = await axios.get('http://localhost:4567/project', {
    const req = await axios({
        method: 'get',
        url: 'http://localhost:4567/project',
        data: {
            path: '/home/mrseven7/ing1/C'
        }
      });    // const req = await axios.get('http://localhost:4567/hierarchy')
    return req.data
};

const fetchHierarchy = async () => {
    const res = await axios.get('http://localhost:4567/hierarchy')
    return res.data
};


postPath().then(res => {
    console.log(res)
})

fetchHierarchy().then(res => {
    dataTree = res.data
})


const App = () => {

    const [arch, setVisible] = useState(true);
    const deployArch = () => {
        setVisible(arch ? false : true)
    }

    return (

    <div className="App" >
        <Header/>
        <button className='btn' type='button' onClick={deployArch}> files </button>
        <Allotment>
            <Allotment.Pane preferredSize={140} minSize={120} priority="LOW" snap visible={arch}>
                <FileSystemNavigator collection={treeData}/>
            </Allotment.Pane>
            <Allotment.Pane minSize={300} priority="HIGH">
                <Allotment vertical snap>
                    <FileScreen/>
                    {/*  here should be the terminal  */}        
                    <FileScreen/>
                </Allotment>
            </Allotment.Pane>
        </Allotment>
    </div>
)};


export default App;
