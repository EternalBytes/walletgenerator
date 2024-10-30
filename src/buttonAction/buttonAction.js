import React, { useState, useCallback } from "react";
import './buttonAction.scss';
import qrcode from './qrcode'; //////////// https://kazuhikoarase.github.io/qrcode-generator/js/demo/
import jsPDF from 'jspdf';
import "jspdf/dist/polyfills.es.js";
import logo from './ecashlogo.png';


export default function ButtonAction({ setLoading, setPdfData }){
    const [ isMainnet, setNetwork ] = useState(true);

    const generateWallet = useCallback(async function(){
        try {
            return await window.generateWallet((isMainnet ? "mainnet" : "testnet"));
        } catch(e) {
            console.log(e)
        }
    }, [isMainnet]);


    const generateQRCode = useCallback(async function(dataStr) {
        qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
        let qr = qrcode(10, 'Q');
        qr.addData(dataStr);
        qr.make();
        return qr.createDataURL(5, 5);
    }, []);

    const getPDF = useCallback(async function(doc, namedoc){
        const link = document.createElement('a');
        link.download = namedoc;
        link.href = doc;
        document.body.appendChild(link);
        link.target = "_blank";
        link.click();
        document.body.removeChild(link);
    }, []);

    const generatePDF = useCallback(async function(paramsObj) {
        let pdf = jsPDF();
        pdf.setFont('helvetica', 'normal');
        // LOGO 69 X 40
        pdf.addImage(logo, "JPEG", 154, 5, 45, 24);
        /// END
        // Secret Key Hex
        pdf.setFontSize(12);
        pdf.text(55, 37, paramsObj.privhex);
        pdf.setFontSize(23);
        pdf.text(55, 20, "Private Key Hex");
        pdf.setFontSize(15);
        pdf.text(0, 40, "_________________________________________________________________________________");
        pdf.addImage(await generateQRCode(paramsObj.privhex), "JPEG", 15, 5, 35, 35);
        /// END

        // Secret Key bASE64 
        pdf.setFontSize(12);
        pdf.text(15, 74, paramsObj.privb64);
        pdf.setFontSize(23);
        pdf.text(15, 58, "Private Key Base64");
        pdf.setFontSize(15);
        pdf.text(0, 77, "_________________________________________________________________________________");
        pdf.addImage(await generateQRCode(paramsObj.privb64), "JPEG", 155, 42, 35, 35);
        /// END
        
        // WIF Compressed
        pdf.setFontSize(12);
        pdf.text(55, 111, paramsObj.wifcomp);
        pdf.setFontSize(23);
        pdf.text(55, 96, "Private Key WIF Compressed");
        pdf.setFontSize(15);
        pdf.text(0, 114, "_________________________________________________________________________________");
        pdf.addImage(await generateQRCode(paramsObj.wifcomp), "JPEG", 15, 79, 35, 35);
        /// END

        // Private Key WIF wifuncomp
        pdf.setFontSize(12);
        pdf.text(15, 148, paramsObj.wifuncomp);
        pdf.setFontSize(23);
        pdf.text(15, 132, "Private Key WIF");
        pdf.setFontSize(15);
        pdf.text(0, 151, "_________________________________________________________________________________");
        pdf.addImage(await generateQRCode(paramsObj.wifuncomp), "JPEG", 155, 116, 35, 35);
        /// END

        // eCash Address addruncomp
        pdf.setFontSize(13);
        pdf.text(51, 219, paramsObj.addruncomp);
        pdf.setFontSize(23);
        pdf.text(77, 159, "eCash Address");
        pdf.setFontSize(15);
        pdf.text(0, 220, "_________________________________________________________________________________");
        pdf.addImage(await generateQRCode(paramsObj.addruncomp), "JPEG", 77, 160, 55, 55);
        /// END

        // eCash Address Compressed addrcomp
        pdf.setFontSize(13);
        pdf.text(48, 289, paramsObj.addrcomp);
        pdf.setFontSize(23);
        pdf.text(50, 228, "eCash Address Compressed");
        pdf.setFontSize(20);
        pdf.addImage(await generateQRCode(paramsObj.addrcomp), "JPEG", 77, 230, 55, 55);
        /// END
        return pdf.output("dataurlstring");
    }, [generateQRCode]);

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
                    let data1 = await generateWallet();

                    let t = setTimeout(async ()=>{
                        let data = await generatePDF(JSON.parse(data1));
                        await getPDF(data, "teste"); //////// DOWNLOAD
                        setLoading(false);
                        clearTimeout(t);
                    }, 1000);
                    
                } }>Generate your paper wallet</button>
            </div>
        </div>
    )
}