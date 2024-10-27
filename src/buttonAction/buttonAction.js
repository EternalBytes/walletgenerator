import React, { useState, useCallback } from "react";
import './buttonAction.scss';

export default function ButtonAction({ setLoading }){
    const [ isMainnet, setNetwork ] = useState(true);
    const generatePdf = useCallback(async function(str){
        return str;
    }, []);
    return (
        <div className="button-container">
            <div className="button-container--box">
                <dir className="button-container--box-network">
                    <div className={ isMainnet ? "mainnet lightblue" : "mainnet darkblue" } onClick={ ()=> setNetwork(true) }>Mainnet</div>
                    <div className={ isMainnet ? "testnet darkblue" : "testnet lightblue" } onClick={ ()=> setNetwork(false) }>Testnet</div>
                </dir>
                <button type="button" onClick={ ()=> {
                    ////////////// JUST FOR TESTS AT THE MOMENT
                    setLoading(true);
                    let e = setTimeout(async ()=>{
                        let str = await generatePdf("The pdf wallet was generated now.");
                        console.log(str + (isMainnet ? "Mainnet" : "Testnet"));
                        setLoading(false);
                        clearTimeout(e)
                    }, 3000);
                } }>Generate your paper wallet</button>
            </div>
        </div>
    )
}