import axios from 'axios'
import CodeMirror from '@uiw/react-codemirror';
import {dracula} from '@uiw/codemirror-theme-dracula';
import {cpp} from '@codemirror/lang-cpp';
import {vim} from "@replit/codemirror-vim"
import React, { useEffect, useState } from 'react'
import "./TextEditor.css"
import smalltalk from 'smalltalk'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid, regular, brands} from '@fortawesome/fontawesome-svg-core/import.macro'

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
    let name

    const openFile = () =>{
        const getFileContent = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/info/file', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            setFileContent(res.data.data.content);
            name = res.data.data.name
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
            setFileName(name);
        }
        openf().then()
    }

    const OpenFile = props.openFile
    const DuplicateFile = props.DuplicateFile
    const closeFile = props.closeFile

    console.log(props.data) 

    return (
        <>
            <div class="topnav">
                <a class="active">{fileName}</a>
                <button className='btn' title={!props.data ? "Saraho" : 'split the window'} onClick={DuplicateFile}>
                    <FontAwesomeIcon icon={solid('table-columns')}/>
                    {/* {!props.data ? "Saraho" : "Split"} */}
                    </button>
                <button className='btn' title={!props.data ? "Misokatra" :'open file'} onClick={openFile}>
                    <FontAwesomeIcon icon={solid('folder-open')}/>
                    {/* {!props.data ? "Misokatra" : "Open"} */}
                    </button>
                <button className='btn' title={!props.data ? "Afa-tsy" :'save file'} onClick={saveFile}>
                    <FontAwesomeIcon icon={solid('floppy-disk')}/>
                    {/* {!props.data ? "Afa-tsy" : "Save"} */}
                    </button>
                <button className='btn' title={!props.data ? "Akaiky" :'close'}  onClick={closeFile}>
                    <FontAwesomeIcon icon={solid('xmark')}/>
                    {/* {!props.data ? "Akaiky" : "Close"} */}
                </button>
            </div>
            <CodeMirror
                value={fileContent}
                theme={!props.sorcier ? dracula : "light"}
                height="100vh"
                extensions={[cpp(), vim()]}
                onChange={setFileContent}
            />

        </>
    )
}
export default TextEditor;

