import React from 'react';
import './Header.css';
import logo from "../../images/barbytes512.png";

const Header = () => {
    return (
        <nav className="header">
            <img src={logo} className="logo" alt="logo" />
            <div className="multi-button">
                <button className="btn-primary">Run</button>
                <button className="btn-secondary">Debug</button>

            </div>
        </nav>
    )
}

export default Header;