import React from 'react';
import {useState, useEffect} from "react";
import './App.css';
import Header from "./components/header-bar/Header";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import {FileScreen} from './components/multiScreen/multi-screen';
import TerminalViewer from "./components/text-editor/terminalViewer";
import axios from 'axios'
import FileSystemNavigator from "./components/tree/Tree";
import smalltalk from "smalltalk"
import ToggleConfetti from "./confettis/ToogleConfettis";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid, regular, brands} from '@fortawesome/fontawesome-svg-core/import.macro'


// const path = prompt("Enter the path of your work directory")



const App = () => {

   let path;
   let pathOfTheFileToOpen; 


    const fetchHierarchy = async () => {
        try {
            const res = await axios.get('http://localhost:4567/hierarchy')
            setDataTree(res.data.data)
        } catch (e) {
            console.log(e)
        }
    };

    const deleteNode = () =>{

        // get the file from api
        console.log(pathOfTheFileToOpen)
        const apiCall = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/delete', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };

        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Delete file or folder","Please enter the name of the file or folder that you want to delete")
            // get the file from api
            path = pathOfTheFileToOpen;
            await apiCall()
            await fetchHierarchy()
        }
        openf().then()
    }
    const createFolder = () =>{

        // get the file from api
        console.log(pathOfTheFileToOpen)
        const apiCall = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/create/folder', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Create folder","Please enter the name of the folder that you want to open")
            // get the file from api
            path = pathOfTheFileToOpen;
            await apiCall()
            await fetchHierarchy()
        }
        openf().then()
    }

    const createFile = () =>{

       
        // get the file from api
        console.log(pathOfTheFileToOpen)
        const apiCall = async () =>{
            try{
            let headers = {
                'Content-Type': 'text/plain'
            }
            const res = await axios.post('http://localhost:4567/create/file', "{'path' : '" + pathOfTheFileToOpen + "'}" , {headers})
            console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        };
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Create file","Please enter the name of the file that you want to create")
            // get the file from api
            path = pathOfTheFileToOpen;
            await apiCall()
            await fetchHierarchy()
        }
        openf().then()
    }

    const [dataTree, setDataTree] = useState({});
    const [arch, setVisible] = useState(true);
    const [compile, setCompile] = useState(false);
    const [outputString, setOutputString] = useState("");
    const [errorString, setErrorString] = useState("");
    const [returnValueString, setReturnValueString] = useState("");

    const toggleCompile = () => {
        setCompile(current => !current);
    };
    const toggleOutputString = (value) => {
        console.log("Value : ")
        console.log(value)
        setOutputString(value);
    };
    const toggleErrorString = (value) => {
        console.log("Value : ")
        console.log(value)
        setErrorString(value);
    };
    const toggleReturnValueString = (value) => {
        console.log("Value : ")
        console.log(value)
        setReturnValueString(value);
    };
    //const [path, setThePath] = useState("");

    const postPath = async (path) => {
        try {
            let headers = {
                'Content-Type': 'text/plain'
            }
            const allPath = "{'path': '" + path + "'}"
            console.log(allPath)
            const res = await axios.post('http://localhost:4567/project', "{'path': '" + path + "'}", {headers})
            console.log(res.data)
            if ((res.data.status) ==="ERROR")
            {
                console.log("dwew")
                return false
            }
            await fetchHierarchy();
            return true;
        } catch (e) {                        
            console.log("here")
            console.log(e)
            return false;
        }
    };
    
    useEffect(() => {
        
        var value = ""
        const prompt = async () => {

            do{
                value = await smalltalk.prompt("Open project", "Enter the path of your work directory")    
                console.log(value)
            }while(! await postPath(value))
        }
        
        prompt().then()
    }, [])



    const deployArch = () => {
        setVisible(arch ? false : true)
    }


    const [data, setData] = useState(true);
    const childToParent = (childData) => {
        setData(childData)
    }

    const launchTerminal = () => {
        axios.get('http://localhost:4567/terminal').then()
    }

    const switchTheme = () => {

    }

    const fontMonospace = " fontMonospace"
    const fontSansSerif = " fontSansSerif"
    const fontTimes = " fontTimes"
    const defaultTheme = "App "
    const sorcierTheme = "sorcier "
    const bigFont = "grand"
    const normalFont = "normal"
    const smallFont = "small"
    const xsmallFont = "xsmall"
    const xbigFont = "xgrand"
    const xxbigFont = "xxgrand"
    const [sizeFont, setSizeFont] = useState(normalFont)
    const [Font, setFont] = useState(fontSansSerif)

    const [witcher, setWitcher] = useState(false);
    const toggleWitcher = () => {
        setWitcher(current => !current);
    }
    const arrFont = [xsmallFont, smallFont, normalFont, bigFont, xbigFont, xxbigFont]

    const decreaseFont = () =>{
        const pos = arrFont.indexOf(sizeFont)
        if (pos == 0)
            return
        setSizeFont(arrFont[pos - 1])
    }

    const increaseFont = () =>{
        const pos = arrFont.indexOf(sizeFont)
        if (pos == 5)
            return
        setSizeFont(arrFont[pos + 1])
    }

    const setfontTimes = () => {
        setFont(fontTimes)
    }
    const setfontSanserif = () => {
        setFont(fontSansSerif)
    }
    const setfontMonospace = () => {
        setFont(fontMonospace)
    }

    const refreshApp = () =>{

        window.location.reload()
    }
    const defaultClassName = defaultTheme + sizeFont + Font
    const sorcierClassName = sorcierTheme + sizeFont + Font
    return (
        <div className={!witcher ? defaultClassName : sorcierClassName}>

            <Header font={Font} witcher={witcher} childToParent={childToParent} fetchHierarchy={fetchHierarchy} toggleCompile={toggleCompile} toggleOutputString={toggleOutputString} compile={compile} toggleErrorString={toggleErrorString} toggleReturnValueString={toggleReturnValueString}/>
          
            <button className='btn' title={!data ? " Manaparitaka Hazo" :'Open new project'} type='button' onClick={refreshApp}>
                <FontAwesomeIcon icon={solid('rotate')}/>
                {/* {!data ? " Manaparitaka Hazo" : " Deploy hierarchy"} */}
            </button>
            <button className='btn' title={!data ? " Manaparitaka Hazo" :'deploy/hide hierarchy'} type='button' onClick={deployArch}>
                <FontAwesomeIcon icon={solid('folder-tree')}/>
                {/* {!data ? " Manaparitaka Hazo" : " Deploy hierarchy"} */}
            </button>
            <button className='btn' title={!data ? " Mamorona Rakitra" :'create file'} type='button' onClick={createFile}>
                <FontAwesomeIcon icon={solid('plus')}/>
                <FontAwesomeIcon icon={solid('file')}/>
                 {/* {!data ? " Mamorona Rakitra" : " Create File"} */}
                 </button>
            <button className='btn' title={!data ? " Mamorona Lahatahiry" :'create folder'} type='button' onClick={createFolder}>
                <FontAwesomeIcon icon={solid('plus')}/>
                <FontAwesomeIcon icon={solid('folder')}/>
                {/* {!data ? " Mamorona Lahatahiry" : " Create Folder"}  */}
            </button>
            <button className='btn' title={!data ? " Hamafa" :'delete file/folder'} type='button' onClick={deleteNode}>
                <FontAwesomeIcon icon={solid('trash')}/>
                {/* {!data ? " Hamafa" : " Delete"} */}
                </button>
            <button className='btn' title={!data ? "mampihena ny endritsoratra" :'decrease font'} type='button' onClick={decreaseFont}>
                <FontAwesomeIcon icon={solid('minus')}/>
                <FontAwesomeIcon icon={solid('font')}/>
                {/* {!data ? "Terminus" : "Terminal"} */}
            </button>
            <button className='btn' title={!data ? "mampitombo endritsoratra" :'increase font'} type='button' onClick={increaseFont}>
                <FontAwesomeIcon icon={solid('plus')}/>
                <FontAwesomeIcon icon={solid('font')}/>
                {/* {!data ? "Terminus" : "Terminal"} */}
            </button>
            <div class="dropdown">
                <button class="dropbtn" className="btn">
                    <FontAwesomeIcon icon={solid('font')}/>
                </button>
                <div class="dropdown-content">
                    <a onClick={setfontTimes} >Times New Roman</a>
                    <a onClick={setfontSanserif}>Arial</a>
                    <a onClick={setfontMonospace}>Courier New</a>
                </div>
            </div>
            <button className='btn' title={!data ? "Terminus" :'launch terminal'} type='button' onClick={launchTerminal}>
                <FontAwesomeIcon icon={solid('terminal')}/>
                {/* {!data ? "Terminus" : "Terminal"} */}
            </button>
            <button className='btn' title={!data ? "mifamadika lohahevitra" :"switch theme"} onClick={toggleWitcher}>
                <FontAwesomeIcon icon={solid('truck-moving')}/>
                {/* {!props.data ? "Akaiky" : "Close"} */}
            </button>
            <Allotment>
                <Allotment.Pane preferredSize={140} minSize={120} priority="LOW" snap visible={arch}>
                    <FileSystemNavigator collection={dataTree}/>
                </Allotment.Pane>
                <Allotment.Pane minSize={300} priority="HIGH">
                    <Allotment vertical snap>
                        <FileScreen isMalagasy={data} witcher={witcher}/>
                        {/*  here should be the terminal  */}
                        <Allotment.Pane visible={compile}>
                            <TerminalViewer witcher={witcher} toggleCompile={toggleCompile} isMalagasy={data} result={outputString} result_err={errorString} exitValue={returnValueString}/>
                        </Allotment.Pane>
                    </Allotment>
                </Allotment.Pane>
            </Allotment>
        </div>
    )
};


export default App;