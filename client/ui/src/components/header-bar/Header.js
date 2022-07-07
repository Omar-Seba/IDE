import React, { useState } from 'react';
import './Header.css';
import logo from "../../images/barbytes512.png";
import logo2 from "../../images/logo.png";

import StopWatch from "../stop-watch/StopWatch";
import Player from "../music-player/player";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import ToggleConfetti from "../../confettis/ToogleConfettis";
import axios from "axios";
import smalltalk from "smalltalk";
import StopConfettis from "../../confettis/StopConfettis";

const Header = ({ font ,childToParent, fetchHierarchy, toggleCompile, toggleOutputString, compile, toggleErrorString, toggleReturnValueString, witcher}) => {
    const [isMalagasy, setIsMalagasy] = useState(false);
    const [isFinish, dropConfetti] = useState(-1);

    const toggleIsFinish = (value) => {
        dropConfetti(value);
    }

    const toggleIsMalagasy = () => {
        setIsMalagasy(current => !current);
    };


    const urls = {
        list: [
            "https://www.ne.jp/asahi/music/myuu/wave/hana.mp3",
            "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
            "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3"
        ],
        index: 0,
    }

    const compileCode = () => {
        let pathOfTheFileToOpen;
        let optionOfFile;
        let resultString;
        let errorString;
        let returnValue;

        const apiCall = async (pathOfTheFileToOpen) =>{
            try{
                let headers = {
                    'Content-Type': 'text/plain'
                }
                let res;
                if (optionOfFile !== "")
                    res = await axios.post('http://localhost:4567/compile', "{'path' : '" + pathOfTheFileToOpen + "', 'option' : '" + optionOfFile + "'}", {headers})
                else
                    res = await axios.post('http://localhost:4567/compile', "{'path' : '" + pathOfTheFileToOpen + "', 'option' : '" + "-o a.out" + "'}", {headers})

                resultString = res.data.data.content
                returnValue = res.data.data.exitValue
                if (resultString === "") {
                    errorString = ""
                }
                else
                {
                    errorString = resultString
                    resultString = ""
                }
                console.log("res")
                console.log(res.data.data.content)
                await fetchHierarchy()
            } catch (e) {
                console.log(e)
            }
        };
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Compile file","Please enter the path of the main")
            optionOfFile = await smalltalk.prompt("Compile file","Please enter the option (if you don't want an option keep empty)")

            await apiCall(pathOfTheFileToOpen)
            if (!compile)
                toggleCompile()
            toggleReturnValueString(returnValue)
            toggleOutputString(resultString)
            toggleErrorString(errorString)
        }
        openf().then()
    }

    const runCode = () => {
        let pathOfTheFileToOpen;
        let resultString;
        let resultStringError;
        let returnValue;

        const apiCall = async (pathOfTheFileToOpen) =>{
            try{
                let headers = {
                    'Content-Type': 'text/plain'
                }
                let res = await axios.post('http://localhost:4567/exec', "{'name': '" + pathOfTheFileToOpen + "'}", {headers})

                resultString = res.data.data.out_content
                resultStringError = res.data.data.err_content
                returnValue = res.data.data.exitValue
                toggleIsFinish(returnValue)

                console.log("res")
                console.log(res)
                await fetchHierarchy()
            } catch (e) {
                console.log(e)
            }
        };
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Exec file","Please enter the path of the exec file")

            await apiCall(pathOfTheFileToOpen)
            if (!compile)
                toggleCompile()
            toggleReturnValueString(returnValue)
            toggleOutputString(resultString)
            toggleErrorString(resultStringError)
        }
        openf().then()
    }

    const debugCode = () => {
        let pathOfTheFileToOpen;

        const apiCall = async (pathOfTheFileToOpen) =>{
            try{
                let headers = {
                    'Content-Type': 'text/plain'
                }
                let res = await axios.post('http://localhost:4567/debug', "{'path': '" + pathOfTheFileToOpen + "'}", {headers})

                console.log("res")
                console.log(res)
                await fetchHierarchy()
            } catch (e) {
                console.log(e)
            }
        };
        const openf = async () => {
            pathOfTheFileToOpen = await smalltalk.prompt("Debug file","Please enter the path of the main file")

            await apiCall(pathOfTheFileToOpen)
        }
        openf().then()
    }
    const btnsecondarycustom = "btn-secondary-custom " + font
    const btnprimary = "btn-primary " + font
    const btnsecondary = "btn-secondary " + font

    console.log(font)
    if (isFinish === 0) {
        setTimeout(() => {
            toggleIsFinish(-1)
        }, 5000);

        return (
            <nav className="header">
                <img src={!witcher ? logo : logo2} className="logo" alt="logo" />
                <div className="multi-button">
                    <button className={btnsecondarycustom} onClick={compileCode}>{isMalagasy ? "Manangona" : "Compile"}</button>
                    <button className={btnprimary} onClick={runCode}>{isMalagasy ? "Mihazakazaka" : "Run"}</button>
                    <button className={btnsecondary} onClick={debugCode}>{isMalagasy ? "Vahaolana" : "Debug"}</button>
                    <Player font={font} urls={urls} malagasy={isMalagasy}/>
                    <StopWatch font={font} malagasy={isMalagasy}/>
                    <button className={"btn-secondary-custom flag"}
                            onClick={function() {
                                toggleIsMalagasy();
                                childToParent(isMalagasy)
                            }}>
                        {isMalagasy ? getUnicodeFlagIcon('MG') : getUnicodeFlagIcon('US')}</button>
                </div>
                <ToggleConfetti />
            </nav>
        )
    }
    else {
        return (
            <nav className="header">
                <img src={!witcher ? logo : logo2} className="logo" alt="logo" />
                <div className="multi-button">
                    <button className={btnsecondarycustom} onClick={compileCode}>{isMalagasy ? "Manangona" : "Compile"}</button>
                    <button className={btnprimary} onClick={runCode}>{isMalagasy ? "Mihazakazaka" : "Run"}</button>
                    <button className={btnsecondary} onClick={debugCode}>{isMalagasy ? "Vahaolana" : "Debug"}</button>
                    <Player font={font} urls={urls} malagasy={isMalagasy}/>
                    <StopWatch font={font} malagasy={isMalagasy}/>
                    <button className={"btn-secondary-custom flag"}
                            onClick={function() {
                                toggleIsMalagasy();
                                childToParent(isMalagasy)
                            }}>
                        {isMalagasy ? getUnicodeFlagIcon('MG') : getUnicodeFlagIcon('US')}</button>
                </div>
                <StopConfettis />

            </nav>
        )
    }
}

export default Header;
