import axios from 'axios'
import CodeMirror from '@uiw/react-codemirror';
import {dracula} from '@uiw/codemirror-theme-dracula';
import {cpp} from '@codemirror/lang-cpp';
import React, { useEffect, useState } from 'react'
import "./TextEditor.css"
import smalltalk from 'smalltalk'


var updatedFile = ""
var path = ""

const TextEditor = (props) => {

    const [fileName, setFileName] = useState("default")
    const [fileContent, setFileContent] = useState("")

    const saveFile = () => {

        const getFileContent = async () => {
            try {
                let headers = {
                    'Content-Type': 'text/plain'
                }
                const res = await axios.post('http://localhost:4567/file', "{'path' : '" + path + "', 'content' : '" + fileContent + "'}", {headers})
                console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        getFileContent()
    }
    let pathOfTheFileToOpen

    const openFile = () =>{
        const getFileContent = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/info/file', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            setFileContent(res.data.data)
            console.log(res.data.data)
            } catch (e) {
                console.log(e)
            }
        };
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Open file","Please enter the path of the file that you want to open")
            // get the file from api
            path = pathOfTheFileToOpen;
            await getFileContent()
            setFileName("test.c");
        }
        openf().then()
    }

    const OpenFile = props.openFile
    const DuplicateFile = props.DuplicateFile
    const closeFile = props.closeFile

    return (
        <>
            <div class="topnav">
                <a class="active">{fileName}</a>
                <button className='btn' onClick={closeFile}>{!props.data ? "Akaiky" : "Close"}</button>
                <button className='btn' onClick={DuplicateFile}>{!props.data ? "Saraho" : "Split"}</button>
                <button className='btn' onClick={openFile}>{!props.data ? "Misokatra" : "Open"}</button>
                <button className='btn' onClick={saveFile}>{!props.data ? "Afa-tsy" : "Save"}</button>
            </div>
            <CodeMirror
                value={fileContent}
                theme={dracula}
                height="100vh"
                extensions={[cpp()]}
                onChange={setFileContent}
            />

        </>
    )
}
export default TextEditor;

