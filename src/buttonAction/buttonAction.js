import React, { useState, useCallback } from "react";
import './buttonAction.scss';
import { generateWallet, mobileAndTabletCheck, generateQRCode, downloadPDF, generatePDF } from '../hooks/hooks';

export default function ButtonAction({ setLoading, setPdfData }){
    const [ isMainnet, setNetwork ] = useState(true);

    const generateWa = useCallback(generateWallet, []);
    const generateQRC = useCallback(generateQRCode, []);

    const getPDF = useCallback(async function(doc, docname){
        if (mobileAndTabletCheck()) {
            downloadPDF(doc, docname);
        } else {
            setPdfData(doc);
        }
        
    }, [setPdfData]);

    return (
        <div className="button-container">
            <div className="button-container--box">
                <div className="button-container--box-network">
                    <div className={ isMainnet ? "mainnet lightblue" : "mainnet darkblue" } onClick={ ()=> setNetwork(true) }>Mainnet</div>
                    <div className={ isMainnet ? "testnet darkblue" : "testnet lightblue" } onClick={ ()=> setNetwork(false) }>Testnet</div>
                </div>
                <button type="button" onClick={ async ()=> {
                    setLoading(true);
                    let t = setTimeout(async ()=>{
                        let data = await generatePDF(JSON.parse(await generateWa(isMainnet)), generateQRC);
                        await getPDF(data, "paper-wallet");
                        data = {};
                        setLoading(false);
                        clearTimeout(t);
                    }, 1500);
                } }>Generate your paper wallet</button>
            </div>
        </div>
    )
}