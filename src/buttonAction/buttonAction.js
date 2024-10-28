import React, { useState, useCallback } from "react";
import './buttonAction.scss';

export default function ButtonAction({ setLoading }){
    const [ isMainnet, setNetwork ] = useState(true);

    const generateWallet = useCallback(async function(){
        try {
            return await window.generateWallet((isMainnet ? "mainnet" : "testnet"));
        } catch(e) {
            console.log(e)
        }
    }, [isMainnet]);

    return (
        <div className="button-container">
            <div className="button-container--box">
                <div className="button-container--box-network">
                    <div className={ isMainnet ? "mainnet lightblue" : "mainnet darkblue" } onClick={ ()=> setNetwork(true) }>Mainnet</div>
                    <div className={ isMainnet ? "testnet darkblue" : "testnet lightblue" } onClick={ ()=> setNetwork(false) }>Testnet</div>
                </div>
                <button type="button" onClick={ async ()=> {
                    ////////////// JUST FOR TESTS AT THE MOMENT
                    setLoading(true);
                    let data = await generateWallet();
                    
                    console.log(data);
                    setLoading(false);
                } }>Generate your paper wallet</button>
            </div>
        </div>
    )
}