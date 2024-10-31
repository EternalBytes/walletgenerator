import React from "react";
import './PopupPDF.css';
import { downloadPDF } from '../hooks/hooks';

export default function PopupPDF({ isLoading, setPdfData, pdfData }) {
    return (
        !isLoading && pdfData !== null ? 
        (
            <div className='paperWallet'>
                <div className='buttons'>
                    <div onClick={()=> downloadPDF(pdfData, `eCash-paper-wallet.pdf`)} className='download'>DOWNLOAD</div>
                    <div onClick={()=>{ 
                        setPdfData(null);
                     }} className='close'>X</div>
                </div>
                
                <iframe src={pdfData} title='Your paper wallet' type='application/pdf' width='100%' height='100%'>
                <p style={{backgroundColor: "red", margin: "30px 10px", padding: 5, textAlign: "center"}}>Não foi possivel disponibilizar o PDF. Faça <a style={{fontWeight: 'bold'}} href={pdfData + ".pdf"}>Download</a></p>
                </iframe>
            </div>
        ) : null
    )
}