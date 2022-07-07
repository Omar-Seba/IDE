import CodeMirror from '@uiw/react-codemirror';
import {dracula} from '@uiw/codemirror-theme-dracula';
import React from 'react'
import "./TextEditor.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const TerminalViewer = ({toggleCompile, isMalagasy, result, result_err, exitValue, witcher}) => {

    const closeFile = toggleCompile
    const outputString = result
    const errString = result_err
    const returnValue = exitValue

    console.log(outputString)

    return (
        <>
            <div class="topnav">
                <a class="active">Output</a>
                <button className='btn' onClick={closeFile}>
                    <FontAwesomeIcon icon={solid('xmark')}/>
                    {/* {!props.data ? "Akaiky" : "Close"} */}
                </button>            </div>
            <CodeMirror
                value={"Exit Value: " + returnValue + "\n\nOutput:\n" + outputString + "\nError output:\n" + errString}
                theme={!witcher ? dracula : "light"}
                height="100vh"
                readOnly={true}
                lineNumbers={false}
            />

        </>
    )
}
export default TerminalViewer;

