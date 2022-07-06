import React from 'react';
import { useState, useEffect } from "react";
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

const App = () => {

    const [dataTree, setDataTree] = useState({});
    // const [postPath, setPostPath] = useState();
    const [arch, setVisible] = useState(true);

    // useEffect(() => {
        const postPath = async () => {
            try{
                // const req = await axios.get('http://localhost:4567/project', {
                let headers = {
                    'Content-Type': 'text/plain'
                }
                const res = await axios.post('http://localhost:4567/project', "{'path': '/home/mrseven7/ing1/C'}", {headers})
                // setPostPath(res.data)
                console.log(res.data)
            }   
            catch (e){
                console.log(e)
            }
        };
        postPath();
    // })
    
    console.log(postPath)


    useEffect(() =>{
        const fetchHierarchy = async () => {
            try{
                const res = await axios.get('http://localhost:4567/hierarchy')
                setDataTree(res.data.data)
            }catch (e){
                console.log(e)
            }
        };
        fetchHierarchy();
    },[])

    const deployArch = () => {
        setVisible(arch ? false : true)
    }

    return (

    <div className="App" >
        <Header/>
        <button className='btn' type='button' onClick={deployArch}> files </button>
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
)};


export default App;
