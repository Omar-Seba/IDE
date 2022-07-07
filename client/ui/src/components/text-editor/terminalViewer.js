import CodeMirror from '@uiw/react-codemirror';
import {dracula} from '@uiw/codemirror-theme-dracula';
import React from 'react'
import "./TextEditor.css"

const TerminalViewer = ({toggleCompile, isMalagasy, result, result_err, exitValue}) => {

    const closeFile = toggleCompile
    const outputString = result
    const errString = result_err
    const returnValue = exitValue

    console.log(outputString)

    return (
        <>
            <div class="topnav">
                <a class="active">Output</a>
                <button className='btn' onClick={closeFile}>{!isMalagasy ? "Akaiky" : "Close"}</button>
            </div>
            <CodeMirror
                value={"Exit Value: " + returnValue + "\n\nOutput:\n" + outputString + "\nError output:\n" + errString}
                theme={dracula}
                height="100vh"
                readOnly={true}
                lineNumbers={false}
            />

        </>
    )
}
export default TerminalViewer;

