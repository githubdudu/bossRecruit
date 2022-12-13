import React from 'react'
import logo from './logo.png';
import LogoContainer from './LogoContainer';
import Img from '../Img';

export default function Logo() {
    return (
        <LogoContainer>
            <Img src={logo} alt="App Logo" />
        </LogoContainer>
    )
}
