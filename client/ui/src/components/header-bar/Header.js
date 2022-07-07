import React, { useState } from 'react';
import './Header.css';
import logo from "../../images/barbytes512.png";
import StopWatch from "../stop-watch/StopWatch";
import Player from "../music-player/player";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import ToggleConfetti from "../../confettis/ToogleConfettis";
import axios from "axios";
import smalltalk from "smalltalk";

const Header = ({childToParent, fetchHierarchy, toggleCompile, toggleOutputString, compile, toggleErrorString, toggleReturnValueString}) => {
    const [isMalagasy, setIsMalagasy] = useState(false);
    const [isFinish, dropConfetti] = useState(false);

    const toggleIsFinish = () => {
        dropConfetti(current => !current);
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
                    res = await axios.post('http://localhost:4567/compile', "{'path' : '" + pathOfTheFileToOpen + "', 'option' : '" + "null" + "'}", {headers})

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

    return (
        <nav className="header">
            <img src={logo} className="logo" alt="logo" />
            <div className="multi-button">
                <button className="btn-secondary-custom" onClick={compileCode}>{isMalagasy ? "Manangona" : "Compile"}</button>
                <button className="btn-primary" onClick={runCode}>{isMalagasy ? "Mihazakazaka" : "Run"}</button>
                <button className="btn-secondary" onClick={debugCode}>{isMalagasy ? "Vahaolana" : "Debug"}</button>
                <Player urls={urls} malagasy={isMalagasy}/>
                <StopWatch malagasy={isMalagasy}/>
                <button className={"btn-secondary-custom flag"}
                        onClick={function() {
                            toggleIsMalagasy();
                            childToParent(isMalagasy)
                        }}>
                    {isMalagasy ? getUnicodeFlagIcon('MG') : getUnicodeFlagIcon('US')}</button>
            </div>
        </nav>
    )
}

export default Header;
