import React, { useState } from 'react'
import "./TextEditor.css"
import axios from 'axios'


var updatedFile = ""
var path = ""

const TextEditor = (props) => 
{

    const [fileName, setFileName] = useState("default") 
    const [fileContent, setFileContent] = useState("")

    const saveFile = () =>{

        const getFileContent = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/file', "{'path' : '" + path + "', 'content' : '" + updatedFile + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        getFileContent()
    }
    const openFile = () =>{

        //pop to enter path of the file
        let pathOfTheFileToOpen = prompt("Please enter the path of the file that you want to open")
        // get the file from api
        path = pathOfTheFileToOpen;

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
        getFileContent()
        setFileName("test.c");
    }

  const OpenFile = props.openFile
  const DuplicateFile = props.DuplicateFile
  const closeFile = props.closeFile
    return(
<>
    <div class="topnav">
  <a class="active">{fileName}</a> 
  <button className='btn' onClick={closeFile}>close</button>
  <button className='btn' onClick={DuplicateFile}>splice</button>
  <button className='btn' onClick={openFile}>open</button>
  <button className='btn' onClick={saveFile}>save</button>
</div>
    <div className="editor" contentEditable="true" onInput={(e) => {
    updatedFile = e.currentTarget.textContent
    console.log(updatedFile)}}
    >
      {fileContent}
    </div>
</>
) 
}
export default TextEditor;

