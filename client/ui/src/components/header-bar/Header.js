import React, { useState } from 'react';
import './Header.css';
import logo from "../../images/barbytes512.png";
import StopWatch from "../stop-watch/StopWatch";
import Player from "../music-player/player";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const Header = ({childToParent}) => {
    const [isMalagasy, setIsMalagasy] = useState(false);

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
    return (
        <nav className="header">
            <img src={logo} className="logo" alt="logo" />
            <div className="multi-button">
                <button className="btn-primary">{isMalagasy ? "Mihazakazaka" : "Run"}</button>
                <button className="btn-secondary">{isMalagasy ? "Vahaolana" : "Debug"}</button>
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
