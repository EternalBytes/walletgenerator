import React from 'react';
import './Header.css';
import logo from './xeclogo.webp';

export default function Header(){
    return (
        <div className='App-header'>
            <div className='App-header-container'>
                <div className='Header-container--logo'>
                    <img src={logo} alt="gold xec coin" />
                    <h2>Generate easily and securely your paper wallets</h2>
                    <h3>A Client-side and Open Source solution that works fine</h3>
                </div>
            </div>
        </div>
    )
}