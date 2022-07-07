import React from 'react'
import { useState } from 'react'
import { Allotment } from 'allotment'
import TextEditor from '../text-editor/TextEditor'
import '../../App.css'
import axios from 'axios'



const openFile = () =>{

    //pop to enter path of the file
    let pathOfTheFileToOpen =
    {
        path : prompt("Please enter the path of the file that you want to open", "")
    }
    // get the file from api

    const getFileContent = async () =>{
        try{
        let headers = {
            'Content-Type': 'text/plain'
        }
        const res = await axios.post('http://localhost:4567/create/file', {data : {path : pathOfTheFileToOpen.path }} , {headers})
        console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    };
}


const FileScreen = (isMalagasy) => {
    const [panes, setPanes] = useState([0]);
    var counter = 0;

    const CloseFile = (pane) => {
        setPanes((panes) => {
            if (panes.length == 1)
                return panes
            const newPanes = [...panes];
            newPanes.splice(newPanes.indexOf(pane), 1);
            console.log(panes)
            return newPanes;
        })}
    const DuplicateFile = () => {
        console.log(panes)
        console.log(counter)
        setPanes((panes) => {
            const newPanes = [...panes, panes[panes.length - 1] + 1];
            return newPanes
        })}
    return (
        <Allotment.Pane minSize={200} priority="HIGH" snap visible> 
            
            <div className="container" >
                <Allotment minSize={200}>
                    <Allotment.Pane minSize={200}>
                    <Allotment>
                        {panes.map((pane) => (
                        <Allotment.Pane key={pane}>
                            <TextEditor data={isMalagasy.isMalagasy} fileName={"file.js"} OpenFile={openFile} DuplicateFile={DuplicateFile} closeFile={() => CloseFile(pane)}/>
                        </Allotment.Pane>
                        ))}
                    </Allotment>
                    </Allotment.Pane>
                </Allotment>
            </div>
        </Allotment.Pane>
    
    )
}

export {FileScreen, openFile}