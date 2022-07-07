import React from 'react';
import {useState, useEffect} from "react";
import './App.css';
import Header from "./components/header-bar/Header";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import {FileScreen} from './components/multiScreen/multi-screen';
import axios from 'axios'
import FileSystemNavigator from "./components/tree/Tree";
import smalltalk from "smalltalk"


// const path = prompt("Enter the path of your work directory")



const App = () => {

   let path;
   let pathOfTheFileToOpen; 


    const fetchHierarchy = async () => {
        try {
            const res = await axios.get('http://localhost:4567/hierarchy')
            setDataTree(res.data.data)
        } catch (e) {
            console.log(e)
        }
    };

    const deleteNode = () =>{

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

        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Open file","Please enter the path of the file that you want to open")
            // get the file from api
            path = pathOfTheFileToOpen;
            await apiCall()
            await fetchHierarchy()
        }
        openf().then()
    }
    const createFolder = () =>{

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
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Open file","Please enter the path of the file that you want to open")
            // get the file from api
            path = pathOfTheFileToOpen;
            await apiCall()
            await fetchHierarchy()
        }
        openf().then()
    }

    const createFile = () =>{

       
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
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Open file","Please enter the path of the file that you want to open")
            // get the file from api
            path = pathOfTheFileToOpen;
            await apiCall()
            await fetchHierarchy()
        }
        openf().then()
    }

    const [dataTree, setDataTree] = useState({});
    const [arch, setVisible] = useState(true);
    //const [path, setThePath] = useState("");

    const postPath = async (path) => {
        try {
            let headers = {
                'Content-Type': 'text/plain'
            }
            const allPath = "{'path': '" + path + "'}"
            console.log(allPath)
            const res = await axios.post('http://localhost:4567/project', "{'path': '" + path + "'}", {headers})
            console.log(res.data)
            if ((res.data.status) ==="ERROR")
            {
                console.log("dwew")
                return false
            }
            await fetchHierarchy();
            return true;
        } catch (e) {                        
            console.log("here")
            console.log(e)
            return false;
        }
    };
    
    useEffect(() => {
        
        var value = ""
        const prompt = async () => {

            do{
                value = await smalltalk.prompt("Open project", "Enter the path of your work directory")    
                console.log(value)
            }while(! await postPath(value))
        }
        
        prompt().then()
    }, [])



    const deployArch = () => {
        setVisible(arch ? false : true)
    }


    const [data, setData] = useState(true);
    const childToParent = (childData) => {
        setData(childData)
    }

    const launchTerminal = () => {

    }

    return (

        <div className="App">
            <Header childToParent={childToParent}/>
            <button className='btn' type='button' onClick={deployArch}>{!data ? "Manaparitaka Hazo" : "Deploy hierarchy"}</button>
            <button className='btn' type='button' onClick={createFile}> {!data ? "Mamorona Rakitra" : "Create File"}</button>
            <button className='btn' type='button' onClick={createFolder}>{!data ? "Mamorona Lahatahiry" : "Create Folder"} </button>
            <button className='btn' type='button' onClick={deleteNode}> {!data ? "Hamafa" : "Delete"}</button>
            <button className='btn' type='button' onClick={launchTerminal}> {!data ? "Terminus" : "Terminal"}</button>
            <Allotment>
                <Allotment.Pane preferredSize={140} minSize={120} priority="LOW" snap visible={arch}>
                    <FileSystemNavigator collection={dataTree}/>
                </Allotment.Pane>
                <Allotment.Pane minSize={300} priority="HIGH">
                    <Allotment vertical snap>
                        <FileScreen isMalagasy={data}/>
                        {/*  here should be the terminal  */}
                        {/* <FileScreen/> */}
                    </Allotment>
                </Allotment.Pane>
            </Allotment>
        </div>
    )
};


export default App;