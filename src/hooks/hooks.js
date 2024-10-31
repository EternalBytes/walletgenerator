import qrcode from './qrcode'; //////////// https://kazuhikoarase.github.io/qrcode-generator/js/demo/
import jsPDF from 'jspdf';
import "jspdf/dist/polyfills.es.js";
import logo from './ecashlogo.png';

async function generateWallet(isMainnet){
    try {
        return await window.generateWallet((isMainnet ? "mainnet" : "testnet"));
    } catch(e) {
        console.error(e);
        return;
    }
}

const mobileAndTabletCheck = function() {
    let check = false;
    // eslint-disable-next-line
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

async function generateQRCode(dataStr) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    let qr = qrcode(10, 'Q');
    qr.addData(dataStr);
    qr.make();
    return qr.createDataURL(5, 5);
}

function downloadPDF(doc, docname) {
    const link = document.createElement('a');
    link.download = docname;
    link.href = doc;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
}

async function generatePDF(paramsObj, generateQRC) {
    let pdf = jsPDF();
    pdf.setFont('helvetica', 'normal');
    // LOGO
    pdf.addImage(logo, "JPEG", 154, 5, 45, 25);
    /// END
    // Secret Key Hex
    pdf.setFontSize(12);
    pdf.text(55, 37, paramsObj.privhex);
    pdf.setFontSize(23);
    pdf.text(55, 20, "Private Key Hex");
    pdf.setFontSize(13);
    pdf.text(2, 40, "_________________________________________________________________________________");
    pdf.addImage(await generateQRC(paramsObj.privhex), "JPEG", 15, 5, 35, 35);
    /// END

    // Secret Key bASE64 
    pdf.setFontSize(12);
    pdf.text(15, 74, paramsObj.privb64);
    pdf.setFontSize(23);
    pdf.text(15, 58, "Private Key Base64");
    pdf.setFontSize(13);
    pdf.text(2, 77, "_________________________________________________________________________________");
    pdf.addImage(await generateQRC(paramsObj.privb64), "JPEG", 155, 42, 35, 35);
    /// END
    
    // WIF Compressed
    pdf.setFontSize(12);
    pdf.text(55, 111, paramsObj.wifcomp);
    pdf.setFontSize(23);
    pdf.text(55, 96, "Private Key WIF Compressed");
    pdf.setFontSize(13);
    pdf.text(2, 114, "_________________________________________________________________________________");
    pdf.addImage(await generateQRC(paramsObj.wifcomp), "JPEG", 15, 79, 35, 35);
    /// END

    // Private Key WIF wifuncomp
    pdf.setFontSize(12);
    pdf.text(15, 148, paramsObj.wifuncomp);
    pdf.setFontSize(23);
    pdf.text(15, 132, "Private Key WIF");
    pdf.setFontSize(13);
    pdf.text(2, 151, "_________________________________________________________________________________");
    pdf.addImage(await generateQRC(paramsObj.wifuncomp), "JPEG", 155, 116, 35, 35);
    /// END

    // eCash Address addruncomp
    pdf.setFontSize(13);
    pdf.text(51, 219, paramsObj.addruncomp);
    pdf.setFontSize(23);
    pdf.text(77, 159, "eCash Address");
    pdf.setFontSize(13);
    pdf.text(2, 220, "_________________________________________________________________________________");
    pdf.addImage(await generateQRC(paramsObj.addruncomp), "JPEG", 77, 160, 55, 55);
    /// END

    // eCash Address Compressed addrcomp
    pdf.setFontSize(13);
    pdf.text(48, 289, paramsObj.addrcomp);
    pdf.setFontSize(23);
    pdf.text(50, 228, "eCash Address Compressed");
    pdf.setFontSize(20);
    pdf.addImage(await generateQRC(paramsObj.addrcomp), "JPEG", 77, 230, 55, 55);
    /// END
    return pdf.output("bloburl");
}

export { generateWallet, mobileAndTabletCheck, generateQRCode, downloadPDF, generatePDF };


