import React from 'react';
import './Header.css';
import logo from "../../images/barbytes512.png";
import StopWatch from "../stop-watch/StopWatch";
import Player from "../music-player/player";

const Header = () => {
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
                <button className="btn-primary">Run</button>
                <button className="btn-secondary">Debug</button>
                <Player urls={urls}/>
                <StopWatch />
            </div>
        </nav>
    )
}

export default Header;