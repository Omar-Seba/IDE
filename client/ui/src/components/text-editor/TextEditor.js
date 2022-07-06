import React from 'react'
import "./TextEditor.css"


const file = "this is my file text I don't care about anything else"


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
</div>
     <div className="editor" contentEditable="true">
      {file}
       </div>
</>
) 
}
export default TextEditor;

