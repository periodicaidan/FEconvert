import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ current }) {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    const toggleBurgerMenu = () => setBurgerMenuOpen(!burgerMenuOpen);

    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/"><b>FEconvert</b></Link>
                <a 
                    role="button" 
                    href="#" 
                    className={`navbar-burger burger ${burgerMenuOpen && 'is-active'}`}
                    aria-label="menu" 
                    aria-expanded="false"
                    onClick={toggleBurgerMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${burgerMenuOpen && 'is-active'}`}>
                <div className="navbar-start">
                    <Link className={`navbar-item ${current === 'about' && 'is-active'}`} to="/about">About</Link>
                </div>
                <div className="navbar-end">
                    <Link className={`navbar-item ${current === 'login' && 'is-active'}`} to="/login">Login</Link>
                    <Link className={`navbar-item ${current === 'signup' && 'is-active'}`} to="/signup">Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}