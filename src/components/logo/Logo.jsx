import React from 'react'
import logo from './logo.png';
import "./logo.less";

export default function Logo() {
    return (
        <div className="home-logo">
            <img  src={logo} alt="App Logo" />
        </div>
    )
}
