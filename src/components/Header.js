import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            {/*I will help you catch your train :)*/}
            <img src={`${process.env.PUBLIC_URL}/assets/logo_full_white.png`} alt="Logo" className="header-logo"/>
            <nav>
                <ul className="nav-list">
                    <li><Link className="nav-link" to="/">Home</Link></li>
                    <li><Link className="nav-link" to="/planner">Planner</Link></li>
                    <li><Link className="nav-link" to="/journey">Journey</Link></li>
                    <li><a className="nav-link" href="https://github.com/enesbkoca/catch-my-train" target="_blank"
                           rel="noopener noreferrer">GitHub</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;