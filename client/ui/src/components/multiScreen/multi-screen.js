import React from 'react'
import { useState } from 'react'
import { Allotment } from 'allotment'
import TextEditor from '../text-editor/TextEditor'
import '../../App.css'

const FileScreen = () => {

    
    const [panes, setPanes] = useState([0]);
    var counter = 0;

    const CloseFile = (pane) => {
        setPanes((panes) => {
            const newPanes = [...panes];
            newPanes.splice(pane, 1);
            console.log(panes)
            return newPanes;
        })}
    const OpenFile = () => {
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
                            <TextEditor filename={"file.js"} OpenFile={OpenFile} CloseFile={() => CloseFile(pane)}/>
                        </Allotment.Pane>
                        ))}
                    </Allotment>
                    </Allotment.Pane>
                </Allotment>
            </div>
        </Allotment.Pane>
    
    )
}

export default FileScreen