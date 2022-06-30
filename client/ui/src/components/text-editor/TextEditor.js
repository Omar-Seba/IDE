import React from 'react'
import "./TextEditor.css"

export default function TextEditor(filename) 
{
    return(
<>
    <div class="topnav">
  <a class="active">filename</a>
</div>
     <div className="editor" contenteditable="true">
        this text 
        can be 
        edited
       </div>
</>
) 
}

