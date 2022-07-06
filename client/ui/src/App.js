import React from 'react';
import {useState, useEffect} from "react";
import './App.css';
import Header from "./components/header-bar/Header";
import FileSystemNavigator from "./components/drawerleft";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import {FileScreen} from './components/multiScreen/multi-screen';
import axios from 'axios'

const path = prompt("Enter the path of your work directory")


const App = () => {

    const fetchHierarchy = async () => {
        try {
            const res = await axios.get('http://localhost:4567/hierarchy')
            setDataTree(res.data.data)
        } catch (e) {
            console.log(e)
        }
    };

    const deleteNode = () =>{

        //pop to enter path of the file
        let pathOfTheFileToOpen = prompt("Please enter the path of the file that you want to open")
       
        // get the file from api
        console.log(pathOfTheFileToOpen)
        const apiCall = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/delete', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        apiCall()
        fetchHierarchy();
    }
    const createFolder = () =>{

        //pop to enter path of the file
        let pathOfTheFileToOpen = prompt("Please enter the path of the file that you want to open")
       
        // get the file from api
        console.log(pathOfTheFileToOpen)
        const apiCall = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/create/folder', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        apiCall()
        fetchHierarchy();
    }

    const createFile = () =>{

        //pop to enter path of the file
        let pathOfTheFileToOpen = prompt("Please enter the path of the file that you want to open")
       
        // get the file from api
        console.log(pathOfTheFileToOpen)
        const apiCall = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/create/file', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        apiCall()
        fetchHierarchy();
    }

    const [dataTree, setDataTree] = useState({});
    const [arch, setVisible] = useState(true);

    const postPath = async () => {
        try {
            let headers = {
                'Content-Type': 'text/plain'
            }
            const allPath = "{'path': '" + path + "'}"
            console.log(allPath)
            const res = await axios.post('http://localhost:4567/project', "{'path': '" + path + "'}", {headers})
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    };
    postPath();

    console.log(postPath)


    useEffect(() => {
        fetchHierarchy();
    }, [])

    const deployArch = () => {
        setVisible(arch ? false : true)
    }

    return (

        <div className="App">
            <Header/>
            <button className='btn' type='button' onClick={deployArch}> Deploy hierarchy</button>
            <button className='btn' type='button' onClick={createFile}> Create File</button>
            <button className='btn' type='button' onClick={createFolder}> Create Folder </button>
            <button className='btn' type='button' onClick={deleteNode}> Delete</button>
            <Allotment>
                <Allotment.Pane preferredSize={140} minSize={120} priority="LOW" snap visible={arch}>
                    <FileSystemNavigator collection={dataTree}/>
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
    )
};


export default App;
