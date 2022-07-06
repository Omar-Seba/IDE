import React from 'react'
import "./TextEditor.css"


var updatedFile = ""

const TextEditor = (props) => 
{
  const fileContent = props.fileContent
  const openFile = props.openFile
  const closeFile = props.closeFile
  const fileName = props.fileName
    return(
<>
    <div class="topnav">
  <a class="active">{fileName}</a> 
  <button className='btn' onClick={closeFile}>close</button>
  <button className='btn' onClick={openFile}>open</button>
  <button className='btn' onClick={openFile}>save</button>
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

