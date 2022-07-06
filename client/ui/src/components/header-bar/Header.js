import React from 'react';
import './Header.css';
import logo from "../../images/barbytes512.png";
import StopWatch from "../stop-watch/StopWatch";

const Header = () => {
    return (
        <nav className="header">
            <img src={logo} className="logo" alt="logo" />
            <div className="multi-button">
                <button className="btn-primary">Run</button>
                <button className="btn-secondary">Debug</button>
                <button className="btn-secondary-custom togglePlay">Play</button>
                <button className="btn-secondary-custom">Pause</button>
                <StopWatch />
            </div>
        </nav>
    )
}

export default Header;