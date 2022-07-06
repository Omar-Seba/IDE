import React from 'react'
import "./TextEditor.css"


const file = "this is my file text I don't care about anything else"
var updatedFile = ""

const TextEditor = (props) => 
{
  const OpenFile = props.OpenFile
  const CloseFile = props.CloseFile
  const filename = props.filename
    return(
<>
    <div class="topnav">
  <a class="active">{filename}</a> 
  <button className='btn' onClick={CloseFile}>close</button>
  <button className='btn' onClick={OpenFile}>open</button>
  <button className='btn' onClick={OpenFile}></button>
</div>
    <div className="editor" contentEditable="true" onInput={(e) => {
    updatedFile = e.currentTarget.textContent
    console.log(updatedFile)}}
    >
      {file}
    </div>
</>
) 
}
export default TextEditor;

